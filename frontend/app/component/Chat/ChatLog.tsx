import { useChat } from '@/app/hooks/useSocket'
import React, { useEffect } from 'react'
import { parseISO, format, addHours } from 'date-fns'
import { ko } from 'date-fns/locale'

const formatChatTimestamp = (isoString: string): string => {
  // ISO 8601 형식의 문자열을 Date 객체로 변환
  const date = parseISO(isoString)

  // 한국 시간 (KST)으로 변환
  const kstDate = addHours(date, 9)

  // 원하는 형식으로 변환
  return format(kstDate, 'hh:mm a', { locale: ko })
}

interface ChatLogProps {
  chatEndRef: React.RefObject<HTMLDivElement>
  type: 'game' | 'lobby'
}

const ChatLog = ({ chatEndRef, type }: ChatLogProps) => {
  const { chatLogs } = useChat()

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLogs])

  return (
    <ul
      className={`max-w-full z-10 ${
        type === 'game' ? 'text-black' : 'text-white'
      } px-2 overflow-y-scroll`}
    >
      {chatLogs.map((log, index) => (
        <li
          key={index}
          className={`flex gap-4 ${type === 'game' ? 'text-black' : 'text-white'} animate-slide-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span className="shrink-0">{log.nickname} : </span>
          <span className="grow truncate">{log.message}</span>
          <span className="shrink-0">{formatChatTimestamp(log.timeStamp)}</span>
        </li>
      ))}
      <div ref={chatEndRef} />
    </ul>
  )
}

export default ChatLog
