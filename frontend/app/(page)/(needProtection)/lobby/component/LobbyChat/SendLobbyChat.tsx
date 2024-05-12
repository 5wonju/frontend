'use client'
import { useAuth } from '@/app/hooks/useAuth'
import { useChat } from '@/app/hooks/useSocket'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const SendLobbyChat = () => {
  // const { socket } = useSocketStore()
  const { sendChat } = useChat()
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const regionInfo = searchParams.get('region') ?? '게임 전체'

  // Todo: 최대 200자 제한 로직 추가
  // Todo: 수신 메세지 최대 100개로 수정
  return (
    <div className="flex w-full z-10 bg-black rounded  gap-2">
      <p className="bg-indigo-500 py-1 px-4  text-white">{regionInfo}</p>
      <input
        type="text"
        placeholder="메세지를 입력해주세요. (최대 200자)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (message.trim() === '') return
            sendChat(message)
            setMessage('')
          }
        }}
        className="grow bg-none placeholder:text-white text-white focus:outline-none bg-transparent px-2 py-1"
      />
      <button
        onClick={() => {
          if (message.trim() === '') return
          sendChat(message)
          setMessage('')
        }}
        className="text-white bg-[#222222] px-2 py-1 "
      >
        전송
      </button>
    </div>
  )
}

export default SendLobbyChat
