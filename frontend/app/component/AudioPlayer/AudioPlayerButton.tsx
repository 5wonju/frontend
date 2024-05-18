import { useAudioPlayStore } from '@/app/lib/store'
import { CirclePause, CirclePlay } from 'lucide-react'
import React from 'react'

const AudioPlayerButton = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  const { isPlaying, setIsPlaying } = useAudioPlayStore()

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

  return (
    <>
      {isPlaying ? (
        <button onClick={handleAudioPause}>
          <CirclePause />
        </button>
      ) : (
        <button onClick={handleAudioPlay}>
          <CirclePlay />
        </button>
      )}
    </>
  )
}

export default AudioPlayerButton
