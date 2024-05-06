'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/app/hooks/useAuth'
import defaultProfileImg from '@/public/defaultProfile.svg'

interface userInfoType {
  userNickname: string
  winCount: number
  winRate: number
  userPoint: number
  exp: number
}
const UserInfo = () => {
  const { userInfo } = useAuth()
  // const [userData, setUserData] = React.useState<userInfoType | null>(null)
  // useEffect(() => {
  // 	userInfo && setUserData(userInfo.userData)
  // }, [userInfo])

  return (
    <>
      <p>유저 정보 컴포넌트</p>
      {userInfo && (
        <Link href={'/mypage'} className="bg-white p-4 shadow-md  flex flex-col gap-1 h-full">
          <div className="flex gap-4">
            <Image
              src={defaultProfileImg}
              alt="Profile Image"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1 grow">
              <div className="font-bold text-lg">{userInfo.userNickname}</div>
              <div>승리: {userInfo.winCount} 승</div>
              <div>승률: {userInfo.winRate}%</div>
            </div>
          </div>
          <div className="">포인트: {userInfo.userPoint}</div>
          <div className="">경험치: {userInfo.exp}</div>
        </Link>
      )}
    </>
  )
}

export default UserInfo
