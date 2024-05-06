'use client'
import React, { useEffect, useState } from 'react'
import { useSocketStore } from '../(page)/channel/lib/store'

const Chat = () => {
  const { sendMessage, chatLogs } = useSocketStore()
  const [message, setMessage] = useState('')
  return (
    <>
      <div>채팅 컴포넌트</div>
      <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          onClick={() => {
            if (message.trim() === '') return
            sendMessage('CHATTING', message)
            setMessage('')
          }}
        >
          전송
        </button>
      </div>
      <div>
        {chatLogs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </>
  )
}

export default Chat
