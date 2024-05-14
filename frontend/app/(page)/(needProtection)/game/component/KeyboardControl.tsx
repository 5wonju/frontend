import React, { useMemo } from 'react'
import { KeyboardControls } from '@react-three/drei'

export const controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
}

const KeyboardControl = ({ children }: { children: React.ReactNode }) => {
  const map = useMemo(
    () => [
      { name: controls.forward, keys: ['ArrowUp'] },
      { name: controls.back, keys: ['ArrowDown'] },
      { name: controls.left, keys: ['ArrowLeft'] },
      { name: controls.right, keys: ['ArrowRight'] },
      { name: controls.jump, keys: ['Space'] },
    ],
    []
  )

  return <KeyboardControls map={map}>{children}</KeyboardControls>
}

export default KeyboardControl
