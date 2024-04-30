'use client'

import { Cylinder } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import AnswerSpot from './AnswerSpot'
import React from 'react'
import { CharacterController } from './CharacterController'

const GameField = () => {
	return (
		<>
			<RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2}>
				<CylinderCollider args={[2 / 2, 10]} />
				<Cylinder scale={[10, 2, 10]} receiveShadow>
					<meshStandardMaterial color="white" />
				</Cylinder>
			</RigidBody>

			<CharacterController />
			<AnswerSpot/>
		</>
	)
}

export default GameField
