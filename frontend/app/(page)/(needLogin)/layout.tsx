import ProtectedRoute from '@/app/component/ProtectedRoute'
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default layout
