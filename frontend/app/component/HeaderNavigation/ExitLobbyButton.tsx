import { useMainSocketStore } from '@/app/(page)/(needProtection)/channel/lib/store'
import { useRouter } from 'next/navigation'
import React from 'react'

const ExitLobbyButton = () => {
  const router = useRouter()
  const { removeSocket } = useMainSocketStore()

  const handleExitLobby = () => {
    removeSocket()
    router.push('/channel')
  }

  return (
    <button onClick={handleExitLobby} className="nav-btn-mono max-w-24">
      Exit
    </button>
  )
}

export default ExitLobbyButton
