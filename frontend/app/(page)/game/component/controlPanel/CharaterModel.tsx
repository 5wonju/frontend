import { useGLTF } from '@react-three/drei'

const CharacterModel = ({ modelPath }) => {
	const { scene } = useGLTF(modelPath)

	return <primitive object={scene} scale={[1, 1, 1]} />
}
export default CharacterModel
