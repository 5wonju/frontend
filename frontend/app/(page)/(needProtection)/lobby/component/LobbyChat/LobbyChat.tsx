'use client'

import { Send } from 'lucide-react'
import LobbyChatLog from './LobbyChatLog'
import SendLobbyChat from './SendLobbyChat'

const LobbyChat = () => {
  return (
    <>
      <div className="bg-[#000000] opacity-80 absolute top-0 left-0 w-full h-full"></div>
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-end gap-2">
        <LobbyChatLog />
        <SendLobbyChat />
      </div>
    </>
  )
}

export default LobbyChat
