'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import GameField from './component/GameField'
import KeyboardControl from './component/KeyboardControl'
import GameControlPanel from './component/GameControlPanel'

const page = () => {
	return (
		<KeyboardControl>
			<Canvas
				shadows
				camera={{ position: [0, 6, 18], fov: 42 }}
				className="absolute top-0 bottom-0"
			>
				<color attach="background" args={['#dbecfb']} />
				<Suspense>
					<Physics debug>
						<GameField />
					</Physics>
				</Suspense>
			</Canvas>
			<GameControlPanel />
		</KeyboardControl>
	)
}

export default page
