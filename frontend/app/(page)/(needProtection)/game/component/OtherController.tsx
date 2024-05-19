//@ts-nocheck

import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Character from './Character'

import OtherCharacter from './OtherCharacter'
import { IOtherStatus } from './OtherPlayers'
import { playerMoveStateEnum } from '../lib/store-type'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3
const RUN_VEL = 1.5

const OtherController = ({
  pos,
  linvel,
  moveState,
  characterType,
  nickname,
  team,
  modelKey,
}: IOtherStatus) => {
  // 플레이어 상태

  const rigidbody = useRef()
  const isOnFloor = useRef(true)
  const character = useRef()

  useEffect(() => {
    // if (!rigidbody.current) return
    // console.log(pos)
    rigidbody.current.setTranslation(vec3({ x: pos.x, y: pos.y, z: pos.z }))
    rigidbody.current.setLinvel(vec3({ x: linvel.x, y: linvel.y, z: linvel.z }))
    // 캐릭터가 이동할 때마다 좌표 받아오기
    // console.log('rigidbody.current', rigidbody.current.linvel())
  }, [pos, linvel])

  useFrame((state, delta) => {
    if (!rigidbody.current) return

    // 점프 구현
    if (moveState === playerMoveStateEnum.JUMP && isOnFloor.current) {
      const jumpImpulse = { x: 0, y: JUMP_FORCE, z: 0 }
      rigidbody.current.applyImpulse(jumpImpulse, true)
      isOnFloor.current = false
    }
    const norm = 3
    // linvel을 기반으로 위치 업데이트
    const currentTranslation = rigidbody.current.translation()
    const newTranslation = {
      x: currentTranslation.x + linvel.x * delta,
      y: currentTranslation.y,
      z: currentTranslation.z + linvel.z * delta,
    }
    rigidbody.current.setTranslation(vec3(newTranslation))

    // 회전 업데이트
    const angle = Math.atan2(linvel.x, linvel.z)
    character.current.rotation.y = angle
  })

  const resetPosition = () => {
    rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }))
    rigidbody.current.setLinvel(vec3({ x: linvel.x, y: linvel.y, z: linvel.z }))
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
          restitution={0} // 반발력 설정: 0(완전 흡수) ~ 1(완전 반사)
          friction={0.1} // 마찰력 설정
        />
        <group ref={character}>
          <OtherCharacter
            pos={rigidbody.current && rigidbody.current.linvel()}
            moveState={moveState}
            characterType={characterType}
            nickname={nickname}
            team={team}
            modelKey={modelKey}
          />
        </group>
      </RigidBody>
    </group>
  )
}

export default OtherController
