import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useGameRoomStore } from '../lib/store'

export default function Character(props) {
	const group = useRef()
	const { nodes, materials, animations, scene } = useGLTF('/models/male/model.gltf')
	const { actions } = useAnimations(animations, group)

	const playerState = useGameRoomStore((state) => state.playerState)
	scene.traverse((child) => {
		console.log('child: ', child)
		if (child.isMesh) {
			child.castShadow = true
		}
	})

	useEffect(() => {
		actions[playerState].reset().fadeIn(0.2).play()
		return () => {
			actions[playerState].fadeOut(0.2)
		}
	}, [playerState])

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Scene">
				<group name="Root003" scale={0.64}>
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
				</group>
			</group>
		</group>
	)
}

useGLTF.preload('./models/male/model.gltf')
