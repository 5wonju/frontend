import { Center, Cylinder, Text3D } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React from 'react'

const TeamSpot = () => {
	const answers = ['red', 'blue']
	const RED_ROTATION = 5.5
	const BLUE_ROTATION = 2.5

	// 5.5  2.5
	return answers.map((teamColor) => (
		<group key={teamColor} rotation-y={teamColor === 'blue' ? BLUE_ROTATION : RED_ROTATION}>
			<group position-x={8} position-z={-8}>
				<RigidBody colliders={false} type="fixed">
					<CylinderCollider args={[2 / 2, 3]} />
					<Cylinder scale={[3, 2, 3]}>
						<meshStandardMaterial color={teamColor === 'red' ? 'red' : 'blue'} />
					</Cylinder>
				</RigidBody>

				<Center position-y={2.5}>
					<Text3D
						font={'./fonts/Geologica Thin_Regular.json'}
						size={2}
						rotation-y={teamColor === 'blue' ? BLUE_ROTATION : RED_ROTATION}
						bevelEnabled={true}
						bevelThickness={0.3}
						bevelSize={0.05}
						bevelOffset={0.2}
					>
						{teamColor}
						<meshNormalMaterial />
					</Text3D>
				</Center>
			</group>
		</group>
	))
}

export default TeamSpot
