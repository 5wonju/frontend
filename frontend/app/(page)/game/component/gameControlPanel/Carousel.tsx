import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { useGLTF } from '@react-three/drei'

const models = [
  '/models/character-select/custom-model0.gltf',
  '/models/character-select/custom-model1.gltf',
  '/models/character-select/custom-model2.gltf',
  '/models/character-select/custom-model3.gltf',
  '/models/character-select/custom-model4.gltf',
  '/models/character-select/custom-model5.gltf',
]

interface ICarouselItem {
  modelPath: string
  position: [number, number, number]
  index: number
  rotation: number
}

const CarouselItem = ({ modelPath, position, index, rotation }: ICarouselItem) => {
  const mesh = useRef<Mesh>(null as Mesh | null)
  const { scene } = useGLTF(modelPath)

  return (
    // 각 방향을 보게 만드는 식 (by 재민)
    // 180도 - 현재 캐릭터의 각도
    // Math.PI * 2 -(index * Math.PI) / 3
    <mesh position={position} ref={mesh} rotation-y={Math.PI * 2 - (index * Math.PI) / 3}>
      <primitive object={scene} scale={[1, 1, 1]} rotation-y={1.5} />
    </mesh>
  )
}

interface ICarousel {
  numItems?: number
  radius?: number
  rotation: number
}

const Carousel = ({ numItems = 6, radius = 2, rotation }: ICarousel) => {
  const group = useRef<Group>(null as Group | null)
  const [targetRotation, setTargetRotation] = useState(0)
  const character = useRef(null as Group | null)

  const getPosition = (index: number) => {
    const angle = (index / numItems) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = 0
    const z = Math.sin(angle) * radius
    return [x, y, z]
  }

  useFrame(() => {
    if (group.current) {
      // console.log('rotation:',rotation)
      const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t
      const step = 0.05 // 이 값을 조정하여 회전 속도와 부드러움을 변경
      rotation = lerp(targetRotation, rotation, step)
      group.current.rotation.y = rotation
      setTargetRotation(rotation)
    }
  })

  return (
    <>
      <group ref={group} position={[0, -1, 0]} rotation-y={rotation}>
        {models.map((modelPath, index) => (
          <group key={index} ref={character}>
            <CarouselItem
              modelPath={modelPath}
              position={getPosition(index) as [number, number, number]}
              index={index}
              rotation={rotation}
            />
          </group>
        ))}
      </group>
    </>
  )
}

export default Carousel
