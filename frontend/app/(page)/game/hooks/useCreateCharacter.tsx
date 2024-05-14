import { useAnimations, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

const pathObj: { [index: number]: string } = {
  0: '/models/custom/custom-model0.gltf',
  1: '/models/custom/custom-model1.gltf',
  2: '/models/custom/custom-model2.gltf',
  3: '/models/custom/custom-model3.gltf',
  4: '/models/custom/custom-model4.gltf',
  5: '/models/custom/custom-model5.gltf',
}

export const useCreateCharacter = (characterIndex: number) => {
  console.log('hook is working!', characterIndex)
  const groupRef = useRef()

  const { nodes, animations, scene } = useGLTF(pathObj[characterIndex])
  const { actions } = useAnimations(animations, groupRef)

  return { nodes, scene, actions, groupRef }
}
