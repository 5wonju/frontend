'use client'

import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useCharacterSelectStore, useModalStore } from '../lib/store'
import { IOtherStatus } from './OtherPlayers'
import { teamEnum } from '../lib/store-type'

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

안녕하세요 저는 이재민입니다
저의 취미는 던전앤파이터입니다.
제가 좋아하는 색깔은 연분홍입니다.
저의 닮은꼴 캐릭터는 스누피의 찰리브라운입니다.
저는 빨간 리본이 잘 어울립니다 ㅎ.ㅎ"></div>
*/

const pathObj = [
  '/models/custom1/custom-model0.gltf',
  '/models/custom1/custom-model1.gltf',
  '/models/custom1/custom-model2.gltf',
  '/models/custom1/custom-model3.gltf',
  '/models/custom1/custom-modsel4.gltf',
  '/models/custom1/custom-model5.gltf',
]
export default function OtherCharacter({
  modelKey,
  pos,
  moveState,
  characterType,
  nickname,
  team,
}: IOtherStatus) {
  const groupRef = useRef()
  // const nickname = '꽁꽁얼어붙은한강위에고양이가걸어다닙니다.'
  console.log('nickname', nickname, moveState, characterType, nickname, team)

  const { nodes, animations, scene } = useGLTF(
    `/models/custom${modelKey}/custom-model${characterType}.gltf`
  )
  const { actions } = useAnimations(animations, scene)
  const { isModalOpen } = useModalStore()
  // 캐릭터에 그림자 효과
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })

  // 캐릭터 움직임 애니메이션
  useEffect(() => {
    if (!actions) return
    console.log(actions)
    console.log('moveState', moveState, actions[moveState])
    actions[moveState].reset().fadeIn(0.2).play()
    return () => {
      if (!actions[moveState]) return
      actions[moveState].fadeOut(0.2)
    }
  }, [moveState, actions])

  return (
    <group ref={groupRef} scale={1}>
      <primitive object={nodes} />
      <primitive object={scene} />
      {pos && (
        <Html position={[0, 3, 0]} className={`${isModalOpen ? 'hidden' : ''}`}>
          <div
            className={`text-sm w-20 overflow-hidd en whitespace-nowrap select-none truncate ${
              team === teamEnum.BLUE
                ? 'text-blue-400'
                : team === teamEnum.RED
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
