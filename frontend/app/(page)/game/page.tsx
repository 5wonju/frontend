'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import GameField from './component/GameField'
import { MeshReflectorMaterial, OrbitControls } from '@react-three/drei'

const page = () => {
	return (
		<Canvas shadows camera={{ position: [0, 6, 18], fov: 42 }}>
			<OrbitControls />
			<color attach="background" args={['#dbecfb']} />
			<fog attach="fog" args={['#dbecfb', 20, 40]} />

			{/* LIGHTS */}
			<ambientLight intensity={1} />
			<directionalLight position={[5, 5, 5]} intensity={0.8} castShadow color={'#9e69da'} />

			{/* BACKGROUND */}
			<mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[50, 50]} />
				<MeshReflectorMaterial
					blur={[400, 400]}
					resolution={1024}
					mixBlur={1}
					mixStrength={15}
					depthScale={1}
					minDepthThreshold={0.85}
					color="#dbecfb"
					metalness={0.6}
					roughness={1}
					mirror={1}
				/>
			</mesh>

			{/* GAME FIELD */}
			<Suspense>
				<Physics debug>
					<GameField />
				</Physics>
			</Suspense>
		</Canvas>
	)
}

export default page
