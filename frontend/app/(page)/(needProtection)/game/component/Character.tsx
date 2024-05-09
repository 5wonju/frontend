// @ts-nocheck
'use client'

import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useCharacterSelectStore, useModalStore, usePlayerStore } from '../lib/store'
import { teamEnum } from '../lib/store-type'
import { useAuth } from '@/app/hooks/useAuth'

const pathObj = {
  0: '/models/custom/custom-model0.gltf',
  1: '/models/custom/custom-model1.gltf',
  2: '/models/custom/custom-model2.gltf',
  3: '/models/custom/custom-model3.gltf',
  4: '/models/custom/custom-model4.gltf',
  5: '/models/custom/custom-model5.gltf',
}
export default function Character({ pos }) {
  const groupRef = useRef()
  const { userInfo } = useAuth()
  const { characterIndex } = useCharacterSelectStore()

  console.log(userInfo)
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
  }, [playerMoveState, actions])

  return (
    <group ref={groupRef} scale={1}>
      <primitive object={nodes} />
      <primitive object={scene} />
      {pos && (
        <Html position={[0, 3, 0]} className={`${isModalOpen ? 'hidden' : ''}`}>
          <div
            className={`text-sm w-20 overflow-hidden whitespace-nowrap select-none truncate ${
              playerTeamState === teamEnum.BLUE
                ? 'text-blue-400'
                : playerTeamState === teamEnum.RED
                ? 'text-red-400'
                : 'text-neutral-700'
            }`}
          >
            {userInfo && userInfo.nickname}
          </div>
        </Html>
      )}
    </group>
  )
}
