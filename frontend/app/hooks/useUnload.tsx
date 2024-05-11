'use client'

import { useEffect } from 'react'
import { useMainSocketStore } from '../lib/store'
import { usePathname } from 'next/navigation'
import path from 'path'

const usePreventUnload = () => {
  // 뒤로가기, 앞으로가기, 새로고침 이벤트 핸들
  const pathname = usePathname()
  const { removeSocket } = useMainSocketStore()

  const handleBFClick = (event: PopStateEvent) => {
    if (pathname === '/lobby' || pathname === '/game') {
      removeSocket()
      alert('연결된 정보가 끊어집니다.')
    } 
  }
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = '현재 페이지를 떠나면 연결이 끊어집니다. 계속 진행할까요?'
    // console.log('새로고침 버튼 클릭')
  }
  useEffect(() => {
    window.addEventListener('popstate', handleBFClick)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('popstate', handleBFClick)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
}

export { usePreventUnload }
