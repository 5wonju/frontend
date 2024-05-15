import React, { useEffect, useRef } from 'react'
import { useAudioPlayStore } from '../../lib/store'
import AudioPlayerButton from './AudioPlayerButton'

import bgm from '@/public/sounds/bgm_example.mp3'

const BgmPlayer = () => {
  const { setIsPlaying } = useAudioPlayStore()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) {
      console.error('audioRef is not defined')
      return
    }

    // autoPlay 설정에 맞춰서 state 셋팅
    setIsPlaying(true)
  }, [])

  return (
    <>
      <h1 className="sr-only">AudioPlayer</h1>
      <audio ref={audioRef} autoPlay loop src={bgm} className="hidden"></audio>
      <AudioPlayerButton audioRef={audioRef} />
    </>
  )
}

export default BgmPlayer
