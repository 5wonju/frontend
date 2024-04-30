import React, { useMemo } from 'react'
import { KeyboardControls } from '@react-three/drei'

export const controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

const KeyboardControl = ({ children }) => {
	const map = useMemo(
		() => [
			{ name: controls.forward, keys: ['ArrowUp', 'KeyW'] },
			{ name: controls.back, keys: ['ArrowDown', 'KeyS'] },
			{ name: controls.left, keys: ['ArrowLeft', 'KeyA'] },
			{ name: controls.right, keys: ['ArrowRight', 'KeyD'] },
			{ name: controls.jump, keys: ['Space'] },
		],
		[]
	)

	return <KeyboardControls map={map}>{children}</KeyboardControls>
}

export default KeyboardControl
