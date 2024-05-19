// @ts-nocheck
import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'
import Character from './Character'

import * as THREE from 'three'
import {
  useCharacterSelectStore,
  useGameRoomStore,
  usePlayerStore,
  useRespawnButtonStore,
} from '../lib/store'
import { controls } from './KeyboardControl'
import { gameStateEnum, playerMoveStateEnum } from '../lib/store-type'
import { useMainSocketStore } from '@/app/lib/store'
import { useAuth } from '@/app/hooks/useAuth'
import { playAudio } from '../lib/util'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3
const RUN_VEL = 1.5

const CharacterController = () => {
  const { socket } = useMainSocketStore()
  // 게임 진행 상태
  const { gameState, gameUserList } = useGameRoomStore((state) => ({
    gameState: state.gameState,
    gameUserList: state.gameUserList,
  }))
  const { letRespawn, setRespawnButton } = useRespawnButtonStore()

  // 플레이어 상태
  const { playerMoveState, setPlayerMoveState, playerTeamState } = usePlayerStore((state) => ({
    playerMoveState: state.playerMoveState,
    setPlayerMoveState: state.setPlayerMoveState,
    playerTeamState: state.playerTeamState,
  }))

  const { characterIndex } = useCharacterSelectStore()

  const jumpPressed = useKeyboardControls((state) => state[controls.jump])
  const leftPressed = useKeyboardControls((state) => state[controls.left])
  const rightPressed = useKeyboardControls((state) => state[controls.right])
  const backPressed = useKeyboardControls((state) => state[controls.back])
  const forwardPressed = useKeyboardControls((state) => state[controls.forward])
  const rigidbody = useRef<RapierRigidBody>()
  const isOnFloor = useRef(true)
  const character = useRef()
  const cameraLookAt = useRef(new THREE.Vector3()).current

  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [linVelocity, setLinVelocity] = useState({ x: 0, y: 0, z: 0 })

  const roundVector = (vector, decimals = 3) => {
    const factor = Math.pow(10, decimals)
    return {
      x: Math.round(vector.x * factor) / factor,
      y: Math.round(vector.y * factor) / factor,
      z: Math.round(vector.z * factor) / factor,
    }
  }

  useEffect(() => {
    const updateState = () => {
      if (rigidbody.current) {
        const newPosition = roundVector(rigidbody.current.translation())
        const newLinVelocity = roundVector(rigidbody.current.linvel())

        if (
          position.x !== newPosition.x ||
          position.y !== newPosition.y ||
          position.z !== newPosition.z
        ) {
          setPosition(newPosition)
        }

        if (
          linVelocity.x !== newLinVelocity.x ||
          linVelocity.y !== newLinVelocity.y ||
          linVelocity.z !== newLinVelocity.z
        ) {
          setLinVelocity(newLinVelocity)
        }
      }
    }

    const intervalId = setInterval(updateState, 500) // 매 0.5초마다 상태 업데이트

    return () => clearInterval(intervalId)
  }, [position, linVelocity])

  const { userInfo } = useAuth()
  useEffect(() => {
    if (socket === null) return
    if (!rigidbody.current) return
    // 플레이어 위치 정보 및 상태 소켓으로 전송
    // console.log('살려줘', linVelocity)
    // console.log('크아악', position)
    // console.log(playerTeamState)
    socket.send(
      JSON.stringify({
        eventType: 'MOVE_CHARACTER',
        data: {
          pos: position,
          linvel: linVelocity,
          moveState: playerMoveState,
          characterType: characterIndex,
          nickname: userInfo.nickname,
          direction: 'left',
          team: playerTeamState,
        },
      })
    )
  }, [playerMoveState, characterIndex, position, linVelocity, playerTeamState])

  useEffect(() => {
    if (!rigidbody.current) return

    // 리스폰 버튼이 true 이면 플레이어 위치 초기화
    if (letRespawn) {
      rigidbody.current.setTranslation(vec3({ x: 0, y: 1, z: 0 }))
      rigidbody.current.setLinvel(vec3({ x: 0, y: 1, z: 0 }))
      setRespawnButton(false)
    }
  }, [letRespawn, setRespawnButton])

  useFrame((state, delta) => {
    if (!rigidbody.current) return

    const impulse = { x: 0, y: 0, z: 0 }
    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE
      setPlayerMoveState(playerMoveStateEnum.JUMP)
      isOnFloor.current = false
      playAudio('jump')
    }

    const linvel = rigidbody.current.linvel()
    let changeRotation = false
    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED
      changeRotation = true
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED
      changeRotation = true
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED
      changeRotation = true
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED
      changeRotation = true
    }

    rigidbody.current.applyImpulse(impulse, true)

    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (isOnFloor.current && playerMoveState !== playerMoveStateEnum.RUN) {
        setPlayerMoveState(playerMoveStateEnum.RUN)
      }
    } else {
      if (isOnFloor.current && playerMoveState !== playerMoveStateEnum.IDLE) {
        setPlayerMoveState(playerMoveStateEnum.IDLE)
      }
    }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z)
      character.current.rotation.y = angle
    }

    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())

    const targetCameraPosition = new THREE.Vector3(
      characterWorldPosition.x,
      0,
      characterWorldPosition.z + 14
    )

    targetCameraPosition.y = 0

    // 게임 진행 상황에 따른 카메라 위치 변경
    switch (gameState) {
      case gameStateEnum.READY:
      case gameStateEnum.DONE:
        targetCameraPosition.y = 10
        break
      case gameStateEnum.GAME:
        targetCameraPosition.y = 6
        break
    }

    state.camera.position.lerp(targetCameraPosition, delta * 2)

    const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)

    const direction = new THREE.Vector3()
    state.camera.getWorldDirection(direction)

    const position = new THREE.Vector3()
    state.camera.getWorldPosition(position)

    const currentLookAt = position.clone().add(direction)
    const lerpedLookAt = new THREE.Vector3()

    lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2)

    // 바라보는 위치 부드럽게 이동
    cameraLookAt.lerp(targetLookAt, delta * 2)

    // 카메라가 실제로 바라보게 설정
    state.camera.lookAt(cameraLookAt)
  })

  const resetPosition = () => {
    rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }))
    rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }))
  }

  return (
    <group>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === 'void') {
            resetPosition()
            playAudio('falling')
          }
        }}
      >
        <CapsuleCollider
          args={[0.8, 0.4]}
          position={[0, 1.2, 0]}
          restitution={0} // 반발력 설정: 0(완전 흡수) ~ 1(완전 반사)
          friction={1} // 마찰력 설정
        />
        <group ref={character}>
          <Character pos={rigidbody.current && rigidbody.current.linvel()} />
        </group>
      </RigidBody>
    </group>
  )
}

export default CharacterController
