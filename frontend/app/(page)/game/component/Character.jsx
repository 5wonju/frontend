import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { teamEnum, usePlayerStore } from '../lib/store'

/*
모델별 scale 조정
model1 -> 0.64
model2 -> 1
model3 -> 1
model3 -> 1
model3 -> 0.64
*/
export default function Character({ pos }) {
	const groupRef = useRef()
	const nickname = '꽁꽁얼어붙은한강위에고양이가걸어다닙니다.'
	const { nodes, materials, animations, scene } = useGLTF('/models/custom/custom-model6.gltf')
	const { actions } = useAnimations(animations, groupRef)

	const { playerMoveState, playerTeamState } = usePlayerStore((state) => ({
		playerMoveState: state.playerMoveState,
		playerTeamState: state.playerTeamState,
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

	return (
		<group ref={groupRef} dispose={null}>
			<group name="Scene">
				<group name="Root003" scale={1}>
					<primitive object={nodes.LeftFootCtrl} />
					<primitive object={nodes.RightFootCtrl} />
					<primitive object={nodes.HipsCtrl} />\
					<primitive object={scene} />
					<skinnedMesh
						name="characterMedium"
						geometry={nodes.characterMedium.geometry}
						material={materials['skin.001']}
						skeleton={nodes.characterMedium.skeleton}
					/>
					{pos && (
						<Html position={[0, 4.7, 0]}>
							<div
								className={`text-sm w-20 overflow-hidden whitespace-nowrap truncate ${
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
			</group>
		</group>
	)
}
