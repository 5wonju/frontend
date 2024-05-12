// @ts-nocheck
'use client'

import { Html, Text, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useCharacterSelectStore, useModalStore, usePlayerStore } from '../lib/store'
import { teamEnum } from '../lib/store-type'
import { useAuth } from '@/app/hooks/useAuth'
import { useFrame, useThree } from '@react-three/fiber'

export default function Character({ pos }) {
  const groupRef = useRef()
  const { userInfo } = useAuth()
  const { characterIndex } = useCharacterSelectStore()

  const { nodes, animations, scene } = useGLTF(`/models/custom/custom-model${characterIndex}.gltf`)
  const { actions } = useAnimations(animations, scene)

  const { playerMoveState, playerTeamState } = usePlayerStore((state) => ({
    playerMoveState: state.playerMoveState,
    playerTeamState: state.playerTeamState,
  }))
  const { isModalOpen } = useModalStore((state) => ({
    isModalOpen: state.isModalOpen,
  }))

  // 캐릭터에 그림자 효과
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })

  // 캐릭터 움직임 애니메이션
  useEffect(() => {
    if (!actions) return

    actions[playerMoveState].reset().fadeIn(0.2).play()
    return () => {
      if (!actions[playerMoveState]) return
      actions[playerMoveState].fadeOut(0.2)
    }
  }, [playerMoveState])

  const textRef = useRef()
  const { camera } = useThree()

  useFrame(() => {
    if (textRef.current) {
      // 텍스트 오브젝트를 카메라 방향으로 회전
      textRef.current.lookAt(camera.position)
      // Y 축을 고정하려면 아래 코드로 조정
      textRef.current.rotation.z = 0
      textRef.current.rotation.y = 0 // Y 축 회전 제거
    }
  })

  return (
    <group ref={groupRef} scale={1}>
      <primitive object={nodes} />
      <primitive object={scene} />
      <Text
        ref={textRef}
        position={[0, 3, 0]} // 캐릭터의 머리 위 적절한 위치에 닉네임을 배치합니다.
        fontSize={0.5} // 폰트 크기를 조절합니다.
        color="black" // 텍스트 색상을 지정합니다.
        anchorX="center" // 텍스트를 중앙 정렬합니다.
        anchorY="bottom" // 텍스트의 하단을 기준으로 위치를 조정합니다.
      >
        {userInfo && userInfo.nickname}
      </Text>
    </group>
  )
}
