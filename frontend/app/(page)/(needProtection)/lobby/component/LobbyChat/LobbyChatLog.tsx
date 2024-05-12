import { useChat } from '@/app/hooks/useSocket'
import React from 'react'

const LobbyChatLog = () => {
  const { chatLogs } = useChat()
  return (
    <div>
      {chatLogs.map((log, index) => (
        <p key={index}>
          <span>{log.nickname}</span>
          <span>{log.message}</span>
          <span>{log.timestamp}</span>
        </p>
      ))}
    </div>
  )
}

export default LobbyChatLog
