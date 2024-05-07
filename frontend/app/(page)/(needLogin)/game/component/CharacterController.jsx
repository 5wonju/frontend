import { Html, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Character from './Character'

import * as THREE from 'three'
import {
	gameStateEnum,
	playerMoveStateEnum,
	useCharacterSelectStore,
	useGameRoomStore,
	usePlayerStore,
} from '../lib/store'
import { controls } from './KeyboardControl'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3
const RUN_VEL = 1.5

const CharacterController = () => {
	// 게임 진행 상태
	const { gameState } = useGameRoomStore((state) => ({
		gameState: state.gameState,
	}))

	// 플레이어 상태
	const { playerMoveState, setPlayerMoveState, playerTeamState } = usePlayerStore((state) => ({
		playerMoveState: state.playerMoveState,
		setPlayerMoveState: state.setPlayerMoveState,
		playerTeamState: state.playerTeamState,
	}))

	const { characterIndex } = useCharacterSelectStore()

	const jumpPressed = useKeyboardControls((state) => state[controls.jump])
	const leftPressed = useKeyboardControls((state) => state[controls.left])
	const rightPressed = useKeyboardControls((state) => state[controls.right])
	const backPressed = useKeyboardControls((state) => state[controls.back])
	const forwardPressed = useKeyboardControls((state) => state[controls.forward])
	const rigidbody = useRef()
	const isOnFloor = useRef(true)
	const character = useRef()
	const cameraLookAt = useRef(new THREE.Vector3()).current

	useEffect(() => {
		if (!rigidbody.current) return
		// 캐릭터가 이동할 때마다 좌표 받아오기
		// console.log('rigidbody.current', rigidbody.current.linvel())
	})

	useFrame((state, delta) => {
		if (!rigidbody.current) return

		const impulse = { x: 0, y: 0, z: 0 }
		if (jumpPressed && isOnFloor.current) {
			impulse.y += JUMP_FORCE
			setPlayerMoveState(playerMoveStateEnum.JUMP)
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

		if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
			if (isOnFloor.current && playerMoveState !== playerMoveStateEnum.RUN) {
				setPlayerMoveState(playerMoveStateEnum.RUN)
			}
		} else {
			if (isOnFloor.current && playerMoveState !== playerMoveStateEnum.IDLE) {
				setPlayerMoveState(playerMoveStateEnum.IDLE)
			}
		}

		if (changeRotation) {
			const angle = Math.atan2(linvel.x, linvel.z)
			character.current.rotation.y = angle
		}

		// CAMERA FOLLOW
		const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())

		const targetCameraPosition = new THREE.Vector3(
			characterWorldPosition.x,
			0,
			characterWorldPosition.z + 14
		)

		// 게임 시작 시 카메라 위치
		if (gameState === gameStateEnum.GAME) {
			targetCameraPosition.y = 6
		}
		// 게임 시작 전 카메라 위치
		if (gameState !== gameStateEnum.GAME) {
			targetCameraPosition.y = 0
		}

		state.camera.position.lerp(targetCameraPosition, delta * 2)

		const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)

		const direction = new THREE.Vector3()
		state.camera.getWorldDirection(direction)

		const position = new THREE.Vector3()
		state.camera.getWorldPosition(position)

		const currentLookAt = position.clone().add(direction)
		const lerpedLookAt = new THREE.Vector3()

		lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2)

		// 바라보는 위치 부드럽게 이동
		cameraLookAt.lerp(targetLookAt, delta * 2)

		// 카메라가 실제로 바라보게 설정
		state.camera.lookAt(cameraLookAt)
	})

	const resetPosition = () => {
		rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }))
		rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }))
	}

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
				onIntersectionEnter={({ other }) => {
					if (other.rigidBodyObject.name === 'void') {
						resetPosition()
						// Todo: 게임 시작 오디오 삽입하기!
						playAudio('fall', () => {
							playAudio('ganbatte')
						})
					}
				}}
			>
				<CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
				<group ref={character}>
					<Character pos={rigidbody.current && rigidbody.current.linvel()} />
				</group>
			</RigidBody>
		</group>
	)
}

export default CharacterController