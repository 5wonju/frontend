'use client'
import { useAuth } from '@/app/hooks/useAuth'
import { useChat } from '@/app/hooks/useSocket'
import React, { useEffect, useMemo, useState } from 'react'

const SendLobbyChat = () => {
  // const { socket } = useSocketStore()
  const { sendChat } = useChat()
  const [message, setMessage] = useState('')

  // Todo: 최대 200자 제한 로직 추가
  // Todo: 수신 메세지 최대 100개로 수정
  // Todo: enter키로 전송할 수 있도록 수정
  // Todo: 현제 지역정보 추가
  return (
    <div className="flex w-full z-10 bg-black rounded px-2 py-1">
      <input
        type="text"
        placeholder="메세지를 입력해주세요. (최대 200자)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="grow bg-none placeholder:text-white"
      />
      <button
        onClick={() => {
          if (message.trim() === '') return
          sendChat(message)
          setMessage('')
        }}
        className="text-white"
      >
        전송
      </button>
    </div>
  )
}

export default SendLobbyChat
