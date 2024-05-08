// @ts-nocheck
'use client'

import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { teamEnum, useCharacterSelectStore, useModalStore, usePlayerStore } from '../lib/store'

/*
모델별 scale 조정
model1 -> 0.64
model2 -> 1
model3 -> 1
model4 -> 1
model5 -> 0.64
model6 -> 1

닉네임 y 위치
1 -> 3
0.64 -> 4.7
*/

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
  const nickname = '꽁꽁얼어붙은한강위에고양이가걸어다닙니다.'
  const { characterIndex } = useCharacterSelectStore()

  const { nodes, animations, scene } = useGLTF(pathObj[characterIndex])
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
            {nickname}
          </div>
        </Html>
      )}
    </group>
  )
}
