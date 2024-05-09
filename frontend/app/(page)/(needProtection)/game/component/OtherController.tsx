import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Character from './Character'

import * as THREE from 'three'
import {
  gameStateEnum,
  playerMoveStateEnum,
  useCharacterSelectStore,
  useGameRoomStore,
  usePlayerStore,
} from '../lib/store'
import { controls } from './KeyboardControl'
import OtherCharacter from './OtherCharacter'
import { IOtherStatus } from './OtherPlayers'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3
const RUN_VEL = 1.5

const OtherController = ({
  pos,
  moveState,
  characterType,
  direction,
  nickname,
  team,
}: IOtherStatus) => {
  // 플레이어 상태

  const rigidbody = useRef()
  const isOnFloor = useRef(true)
  const character = useRef()

  useEffect(() => {
    if (!rigidbody.current) return
    rigidbody.current.setTranslation(vec3({ x: pos.x, y: pos.y, z: pos.z }))
    rigidbody.current.setLinvel(vec3({ x: pos.x, y: pos.y, z: pos.z }))
    // 캐릭터가 이동할 때마다 좌표 받아오기
    // console.log('rigidbody.current', rigidbody.current.linvel())
  }, [pos])

  useFrame((state, delta) => {
    if (!rigidbody.current) return

    // vec3({ x: pos.x, y: pos.y, z: pos.z })

    const impulse = { x: 0, y: 0, z: 0 }
    if (moveState === playerMoveStateEnum.JUMP && isOnFloor.current) {
      impulse.y += JUMP_FORCE
      isOnFloor.current = false
    }

    const linvel = rigidbody.current.linvel()
    let changeRotation = false
    if (direction === 'right') {
      if (moveState === playerMoveStateEnum.RUN && linvel.x < MAX_VEL) impulse.x += MOVEMENT_SPEED
      changeRotation = true
    }
    if (direction === 'left') {
      if (moveState === playerMoveStateEnum.RUN && linvel.x > -MAX_VEL) impulse.x -= MOVEMENT_SPEED
      changeRotation = true
    }
    if (direction === 'back') {
      if (moveState === playerMoveStateEnum.RUN && linvel.z < MAX_VEL) impulse.z += MOVEMENT_SPEED
      changeRotation = true
    }
    if (direction === 'forward') {
      if (moveState === playerMoveStateEnum.RUN && linvel.z > -MAX_VEL) impulse.z -= MOVEMENT_SPEED
      changeRotation = true
    }

    rigidbody.current.applyImpulse(impulse, true)

    // if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
    //   if (isOnFloor.current && moveState !== playerMoveStateEnum.RUN) {
    //     setPlayerMoveState(playerMoveStateEnum.RUN)
    //   }
    // } else {
    //   if (isOnFloor.current && moveState !== playerMoveStateEnum.IDLE) {
    //     setPlayerMoveState(playerMoveStateEnum.IDLE)
    //   }
    // }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z)
      character.current.rotation.y = angle
    }
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
          }
        }}
      >
        <CapsuleCollider
          args={[0.8, 0.4]}
          position={[0, 1.2, 0]}
          restitution={1} // 반발력 설정: 0(완전 흡수) ~ 1(완전 반사)
          friction={0.1} // 마찰력 설정
        />
        <group ref={character}>
          <OtherCharacter
            pos={rigidbody.current && rigidbody.current.linvel()}
            moveState={moveState}
            characterType={characterType}
            direction={direction}
            nickname={nickname}
            team={team}
          />
        </group>
      </RigidBody>
    </group>
  )
}

export default OtherController