'use client'

import LobbyChatLog from './LobbyChatLog'
import SendLobbyChat from './SendLobbyChat'
import { useRef } from 'react'

const LobbyChat = () => {
  const chatEndRef = useRef(null)

  return (
    <>
      <div className="bg-[#000000] opacity-80 absolute top-0 left-0 w-full h-full"></div>
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-end gap-2">
        <LobbyChatLog chatEndRef={chatEndRef} />
        <SendLobbyChat />
      </div>
    </>
  )
}

export default LobbyChat
