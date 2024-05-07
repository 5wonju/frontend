'use client'

import ProtectedLogin from '@/app/component/ProtectionComponent/ProtectedLogin'
import ProtectedRoute from '@/app/component/ProtectionComponent/ProtectedRoute'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const currentPath = usePathname()

  if (currentPath === '/login') {
    return <ProtectedLogin>{children}</ProtectedLogin>
  } else if (currentPath !== '/login' && currentPath !== '/login/callback') {
    return <ProtectedRoute>{children}</ProtectedRoute>
  } else return <>{children}</>
}

export default ProtectedLayout
