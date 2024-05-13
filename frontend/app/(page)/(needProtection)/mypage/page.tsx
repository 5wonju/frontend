'use client'
import React, { useEffect } from 'react'
import UserInfo from '../../../component/UserInfo'
import ModifyNickname from './component/ModifyNickname'

const Mypage = () => {
  return (
    <section className="h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center">
      <UserInfo />
      <ModifyNickname />
    </section>
  )
}

export default Mypage
