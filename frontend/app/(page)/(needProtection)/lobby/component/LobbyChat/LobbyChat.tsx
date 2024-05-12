'use client'

import { Send } from 'lucide-react'
import LobbyChatLog from './LobbyChatLog'
import SendLobbyChat from './SendLobbyChat'

const LobbyChat = () => {
  return (
    <div>
      <LobbyChatLog />
      <SendLobbyChat />
    </div>
  )
}

export default LobbyChat
