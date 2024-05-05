import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import * as THREE from 'three'
import CharacterModel from './CharaterModel'
import { OrbitControls } from '@react-three/drei'

const models = [
	'/models/custom/custom-model1.gltf',
	'/models/custom/custom-model2.gltf',
	'/models/custom/custom-model3.gltf',
	'/models/custom/custom-model4.gltf',
	'/models/custom/custom-model5.gltf',
	'/models/custom/custom-model6.gltf',
]
// Carousel 아이템 컴포넌트
const CarouselItem = ({
	modelPath,
	position,
	color,
}: {
	modelPath: string
	position: any
	color: any
}) => {
	const mesh = useRef<Mesh>(null as Mesh | null)

	return (
		<mesh position={position} ref={mesh}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={color} />
			<CharacterModel modelPath={modelPath} />
		</mesh>
	)
}

// Carousel 메인 컴포넌트
const Carousel = ({ numItems = 6, radius = 2, rotation }) => {
	const group = useRef<Group>(null as Group | null)
	const [targetRotation, setTargetRotation] = useState(0)
	const character = useRef()
	const cameraLookAt = useRef(new THREE.Vector3()).current

	const getPosition = (index: number) => {
		const angle = (index / numItems) * Math.PI * 2
		const x = Math.cos(angle) * radius
		const y = 0
		const z = Math.sin(angle) * radius
		return [x, y, z]
	}

	// Rotate Left 혹은 Right 버튼 클릭시 이동할때 자연스럽게 움직이도록 애니메이션 넣기
	useFrame((state, delta) => {
		if (group.current) {
			const lerp = (a, b, t) => a * (1 - t) + b * t
			const step = 0.1 // 이 값을 조정하여 회전 속도와 부드러움을 변경
			rotation = lerp(targetRotation, rotation, step)
			group.current.rotation.y = rotation
			setTargetRotation(rotation)

			// cameraLookAt.lerp(new THREE.Vector3(...getPosition()), delta * 2)

			// state.camera.lookAt(cameraLookAt)
		}
	})

	return (
		<>
			<group ref={group} rotation-y={rotation}>
				{models.map((modelPath, index) => (
					<group key={index} ref={character}>
						<CarouselItem
							modelPath={modelPath}
							position={getPosition(index)}
							color={`hsl(${(index / numItems) * 360}, 100%, 50%)`}
						/>
					</group>
				))}
			</group>
		</>
	)
}

export default Carousel
