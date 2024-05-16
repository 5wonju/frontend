import React, { useEffect, useRef } from 'react'
import { useAudioPlayStore } from '../../lib/store'
import AudioPlayerButton from './AudioPlayerButton'

import ReadyBgm from '@/public/sounds/bgm_example.mp3'
import { useGameRoomStore } from '@/app/(page)/(needProtection)/game/lib/store'

const BgmPlayer = () => {
  const { setIsPlaying } = useAudioPlayStore()
  const { gameState } = useGameRoomStore()
  const [bgm, setBgm] = React.useState(ReadyBgm)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) {
      console.error('audioRef is not defined')
      return
    }
    // autoPlay 설정에 맞춰서 state 셋팅
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    switch (gameState) {
      case 'READY':
        setBgm(ReadyBgm)
        break
      // Todo : 게임 환경 테스트하고 수행해볼 것
      case 'COUNTDOWN':
        break
      case 'GAME':
        break
      case 'DONE':
        break
    }
  }, [gameState])

  return (
    <>
      <h1 className="sr-only">AudioPlayer</h1>
      <audio ref={audioRef} autoPlay loop src={bgm} className="hidden"></audio>
      <AudioPlayerButton audioRef={audioRef} />
    </>
  )
}

export default BgmPlayer
