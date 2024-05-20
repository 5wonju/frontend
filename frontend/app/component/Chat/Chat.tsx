'use client'

import ChatLog from './ChatLog'
import SendChat from './SendChat'
import { useRef } from 'react'

const Chat = ({type}: {type: 'game' | 'lobby'}) => {
  const chatEndRef = useRef(null)

  return (
    <>
      <div className={`${type === 'game' ? 'glass' : 'bg-[#000000]'} opacity-80 absolute top-0 left-0 w-full h-full`}></div>
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-end gap-2">
        <ChatLog chatEndRef={chatEndRef} type={type}/>
        <SendChat />
      </div>
    </>
  )
}

export default Chat
