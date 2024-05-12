'use client'
import { useAuth } from '@/app/hooks/useAuth'
import { useChat } from '@/app/hooks/useSocket'
import React, { useEffect, useMemo, useState } from 'react'

const SendLobbyChat = () => {
  // const { socket } = useSocketStore()
  const { sendChat } = useChat()
  const [message, setMessage] = useState('')

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button
        onClick={() => {
          if (message.trim() === '') return
          sendChat(message)
          setMessage('')
        }}
      >
        전송
      </button>
    </div>
  )
}

export default SendLobbyChat
