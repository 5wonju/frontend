'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMainSocketStore } from '@/app/lib/store'

const ProtectedSocket = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useMainSocketStore()
  const router = useRouter()

  // 소켓이 끊어졌을 때는 재접속을 유도하도록 null일 때만 리다이렉트
  useEffect(() => {
    if (socket === null) {
      router.push('/channel')
    }
  }, [socket])

  if (socket === null) return null

  return children
}

export default ProtectedSocket
