import { useChat } from '@/app/hooks/useSocket'
import React, { useEffect } from 'react'

interface LobbyChatLogProps {
  chatEndRef: React.RefObject<HTMLDivElement>
}

const LobbyChatLog = ({ chatEndRef }: LobbyChatLogProps) => {
  const { chatLogs } = useChat()

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLogs])

  return (
    <ul className="max-w-full z-10 text-white px-2 overflow-y-scroll">
      {chatLogs.map((log, index) => (
        <li
          key={index}
          className="flex gap-4 text-white animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span className="shrink-0">{log.nickname} : </span>
          <span className="grow truncate">{log.message}</span>
          <span className="shrink-0">{log.timestamp}</span>
        </li>
      ))}
      <div ref={chatEndRef} />
    </ul>
  )
}

export default LobbyChatLog
