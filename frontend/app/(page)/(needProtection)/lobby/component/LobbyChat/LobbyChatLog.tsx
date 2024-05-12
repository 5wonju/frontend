import { useChat } from '@/app/hooks/useSocket'
import React from 'react'

const LobbyChatLog = () => {
  const { chatLogs } = useChat()
  return (
    <ul className="max-w-full z-10 text-white">
      {chatLogs.map((log, index) => (
        <li key={index} className="flex gap-4">
          <span className="shrink-0">{log.nickname} : </span>
          <span className="grow truncate">{log.message}</span>
          <span className="shrink-0">{log.timestamp}</span>
        </li>
      ))}
    </ul>
  )
}

export default LobbyChatLog
