// @ts-nocheck
'use client'

import { Html, Text, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useCharacterSelectStore, useModalStore, usePlayerStore } from '../lib/store'
import { teamEnum } from '../lib/store-type'
import { useAuth } from '@/app/hooks/useAuth'
import { useFrame, useThree } from '@react-three/fiber'

const modelPaths = [
  '/models/custom/custom-model0.gltf',
  '/models/custom/custom-model1.gltf',
  '/models/custom/custom-model2.gltf',
  '/models/custom/custom-model3.gltf',
  '/models/custom/custom-model4.gltf',
  '/models/custom/custom-model5.gltf',
]

export default function Character({ pos }) {
  const groupRef = useRef()
  const { userInfo } = useAuth()
  const { characterIndex } = useCharacterSelectStore()

  const { nodes, animations, scene } = useGLTF(modelPaths[characterIndex])
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
    if (child.amIMesh) {
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
    <group ref={groupRef} scale={1.2}>
      <primitive object={nodes} />
      <primitive object={scene} />
      <Text
        ref={textRef}
        position={[0, 3, 0]}
        fontSize={0.5}
        color={
          playerTeamState === teamEnum.RED
            ? '#ff8080'
            : playerTeamState === teamEnum.BLUE
            ? 'skyblue'
            : '#454545'
        }
        anchorX="center"
        anchorY="bottom"
      >
        {userInfo && userInfo.nickname}
      </Text>
    </group>
  )
}
