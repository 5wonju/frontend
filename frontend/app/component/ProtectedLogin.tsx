'use client'
import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const ProtectedLogin = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading, refetch } = useAuth()
  const router = useRouter()

  useEffect(() => {
    refetch()

    if (!isLoading && isLoggedIn) {
      router.push('/channel')
      return
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isLoading])

  if (isLoading || isLoggedIn) return <div>Loading...</div>

  return children
}

export default ProtectedLogin
