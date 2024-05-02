'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import GameField from './component/GameField'
import KeyboardControl from './component/KeyboardControl'

const page = () => {
	return (
		<KeyboardControl>
			<Canvas shadows camera={{ position: [0, 6, 18], fov: 42 }}>
				<color attach="background" args={['#dbecfb']} />
				<Suspense>
					<Physics>
						<GameField />
					</Physics>
				</Suspense>
			</Canvas>
		</KeyboardControl>
	)
}

export default page
