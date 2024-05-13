'use client'
import React, { useEffect } from 'react'
import UserInfo from '../../../component/UserInfo'
import ModifyNickname from './component/ModifyNickname'

const Mypage = () => {
  return (
    <section className="">
      <UserInfo />
      <ModifyNickname />
    </section>
  )
}

export default Mypage
