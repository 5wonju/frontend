import { useRouter } from 'next/navigation'
import React from 'react'

const GoBackButton = () => {
  const router = useRouter()
  const handleClickGoBack = () => {
    router.back()
  }
  return (
    <button onClick={handleClickGoBack} className="nav-btn-mono">
      돌아가기
    </button>
  )
}

export default GoBackButton
