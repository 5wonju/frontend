'use client'

import React from 'react'
import { useAuth } from '@/app/hooks/useAuth'

const LogoutButton = () => {
  const { logout } = useAuth()
  return (
    <button onClick={logout} className="nav-btn-mono max-w-24 ">
      Logout
    </button>
  )
}

export default LogoutButton
