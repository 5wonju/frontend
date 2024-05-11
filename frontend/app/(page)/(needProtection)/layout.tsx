'use client'

import HeaderNavigationBar from '@/app/component/Navigation/HeaderNavigationBar'
import ProtectedLogin from '@/app/component/ProtectionComponent/ProtectedLogin'
import ProtectedRoute from '@/app/component/ProtectionComponent/ProtectedRoute'
import ProtectedSocket from '@/app/component/ProtectionComponent/ProtectedSocket'
import { usePreventUnload } from '@/app/hooks/useUnload'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  usePreventUnload()
  const currentPath = usePathname()

  switch (currentPath) {
    case '/login':
      return (
        <ProtectedLogin>
          <main className="pt-14 h-full">
            <HeaderNavigationBar />
            {children}
          </main>
        </ProtectedLogin>
      )
    case '/login/callback':
      // 이 페이지만 예외적으로 적용
      return <>{children}</>
    case '/lobby':
    case '/game':
      return (
        <ProtectedRoute>
          <ProtectedSocket>
            <main className="pt-14 h-full">
              <HeaderNavigationBar />
              {children}
            </main>
          </ProtectedSocket>
        </ProtectedRoute>
      )
    default:
      return (
        <ProtectedRoute>
          <main className="pt-14 h-full">
            <HeaderNavigationBar />
            {children}
          </main>
        </ProtectedRoute>
      )
  }
}

export default ProtectedLayout
