import React, { useEffect, useRef } from 'react'
import { useAudioPlayStore } from '../lib/store'

import bgm from '@/public/sounds/bgm_example.mp3'

const AudioPlayer = () => {
  const { isPlaying, setIsPlaying } = useAudioPlayStore()
  const audioRef = useRef<HTMLAudioElement>(null)

  // useEffect(() => {
  //   if (!audioRef.current) {
  //     console.error('audioRef is not defined')
  //     return
  //   }

  //   if (isPlaying) {
  //     audioRef.current.play()
  //   } else {
  //     audioRef.current.pause()
  //   }
  // }, [isPlaying])

  const handleAudioPlay = () => {
    if (!audioRef.current) {
      console.error('audioRef is not defined')
      return
    }

    audioRef.current.play()
    setIsPlaying(true)
  }
  const handleAudioPause = () => {
    if (!audioRef.current) {
      console.error('audioRef is not defined')
      return
    }

    audioRef.current.pause()
    setIsPlaying(false)
  }

  return <audio ref={audioRef} autoPlay loop src={bgm}></audio>
}

export default AudioPlayer
