'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import GameField from './component/GameField'
import KeyboardControl from './component/KeyboardControl'
import GameControlPanel from './component/gameControlPanel/GameControlPanel'
import GameInfoPanel from './component/gameInfoPanel/GameInfoPanel'
import GameResult from './component/gameResult/GameResult'
import { useMainSocketStore } from '@/app/lib/store'
import { useSetupSocket } from '@/app/hooks/useSetupSocket'
import WebGLContextManager from './component/WebGLContextManager'

const Game = () => {
  const { socket } = useMainSocketStore()
  useSetupSocket(socket)

  return (
    <KeyboardControl>
      <Canvas
        shadows
        camera={{ position: [0, 40, 20], fov: 42 }}
        className="absolute top-0 bottom-0"
      >
        <WebGLContextManager />
        <color attach="background" args={['#dbecfb']} />
        <Suspense>
          <Physics>
            <GameField />
          </Physics>
        </Suspense>
      </Canvas>
      {/* <GameInfoPanel /> */}
      {/* <GameControlPanel /> */}
      <GameResult />
    </KeyboardControl>
  )
}

export default Game
