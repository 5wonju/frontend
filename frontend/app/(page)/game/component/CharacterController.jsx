import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import Character from './characters/Character'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3

export const Controls = {
	forward: 'forward',
	back: 'back',
	left: 'left',
	right: 'right',
	jump: 'jump',
}

export const CharacterController = () => {
	const jumpPressed = useKeyboardControls<Controls>((state) => state.jump)
	const leftPressed = useKeyboardControls<Controls>((state) => state.left)
	const rightPressed = useKeyboardControls<Controls>((state) => state.right)
	const backPressed = useKeyboardControls<Controls>((state) => state.back)
	const forwardPressed = useKeyboardControls<Controls>((state) => state.forward)
	const rigidbody = useRef()
	const isOnFloor = useRef(true)

	useFrame(() => {
		const impulse = { x: 0, y: 0, z: 0 }
		if (jumpPressed && isOnFloor.current) {
			impulse.y += JUMP_FORCE
			isOnFloor.current = false
		}

		const linvel = rigidbody.current.linvel()
		let changeRotation = false
		if (rightPressed && linvel.x < MAX_VEL) {
			impulse.x += MOVEMENT_SPEED
			changeRotation = true
		}
		if (leftPressed && linvel.x > -MAX_VEL) {
			impulse.x -= MOVEMENT_SPEED
			changeRotation = true
		}
		if (backPressed && linvel.z < MAX_VEL) {
			impulse.z += MOVEMENT_SPEED
			changeRotation = true
		}
		if (forwardPressed && linvel.z > -MAX_VEL) {
			impulse.z -= MOVEMENT_SPEED
			changeRotation = true
		}

		rigidbody.current.applyImpulse(impulse, true)
		if (changeRotation) {
			const angle = Math.atan2(linvel.x, linvel.z)
			character.current.rotation.y = angle
		}
	})

	const character = useRef()
	return (
		<group>
			<RigidBody
				ref={rigidbody}
				colliders={false}
				scale={[0.5, 0.5, 0.5]}
				enabledRotations={[false, false, false]}
				onCollisionEnter={() => {
					isOnFloor.current = true
				}}
			>
				<CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
				<group ref={character}>
					<Character />
				</group>
			</RigidBody>
		</group>
	)
}
