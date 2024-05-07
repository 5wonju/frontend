'use client'
import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading, refetch } = useAuth()
  const router = useRouter()
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isLoggedIn) {
    router.push('/login')
    return null
  }
  return children
}

export default ProtectedRoute
