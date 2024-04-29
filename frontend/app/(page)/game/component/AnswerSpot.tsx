import { Center, Cylinder, Text3D } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React from 'react'

const AnswerSpot = () => {
	const answers = ['A', 'B', 'C', 'D']
	return answers.map((answer, index) => (
		<group key={answer} rotation-y={(index / 4) * Math.PI * 2}>
			<group position-x={8} position-z={-8}>
				<RigidBody colliders={false} type="fixed">
					<CylinderCollider args={[0.25 / 2, 3]} />
					<Cylinder scale={[3, 0.25, 3]}>
						<meshStandardMaterial color="white" />
					</Cylinder>
				</RigidBody>

				<Center position-y={1.8}>
					<Text3D
						font={'./fonts/Geologica Thin_Regular.json'}
						size={2}
						rotation-y={-(index / 4) * Math.PI * 2}
            bevelEnabled={true}
            bevelThickness={0.3}
            bevelSize={0.05}
						bevelOffset={0.2}
					>
						{answer}
						<meshNormalMaterial/>
					</Text3D>
				</Center>
			</group>
		</group>
	))
}

export default AnswerSpot
