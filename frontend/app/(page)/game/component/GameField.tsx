'use client'

import { Cylinder } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import AnswerSpot from './AnswerSpot'
import React from 'react'

const GameField = () => {
	return (
		<>
			<RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2}>
				<CylinderCollider args={[1 / 2, 10]} />
				<Cylinder scale={[10, 1, 10]} receiveShadow>
					<meshStandardMaterial color="white" />
				</Cylinder>
			</RigidBody>

			<AnswerSpot/>
		</>
	)
}

export default GameField
