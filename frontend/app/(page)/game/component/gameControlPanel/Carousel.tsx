import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { useGLTF } from '@react-three/drei'
import { ICarouselItemProp, ICarouselProp } from '../../lib/type'
import { getPosition, models } from '../../lib/util'

const CarouselItem = ({ modelPath, position, index, rotation }: ICarouselItemProp) => {
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

const Carousel = ({ numItems = 6, radius = 2, rotation }: ICarouselProp) => {
  const group = useRef<Group>(null as Group | null)
  const [targetRotation, setTargetRotation] = useState(0)
  const character = useRef(null as Group | null)

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
              position={getPosition(index, 6, radius) as [number, number, number]}
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
