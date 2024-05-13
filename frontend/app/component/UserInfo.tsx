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

  return (
    <>
      <p className="sr-only">유저 정보 컴포넌트</p>
      {userInfo && (
        <Link
          href={'/mypage'}
          className="bg-white p-4  flex flex-col justify-center gap-1 items-center"
        >
          <div className="flex gap-4">
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={defaultProfileImg}
                alt="Profile Image"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="font-bold text-lg">{userInfo.nickname}</div>
            </div>
            <dl className="grid grid-cols-2 gap-1 grow">
              <dt className="font-bold inline-block">승리 : </dt>
              <dd className="inline-block">{userInfo.winCnt}승</dd>
              <dt className="font-bold inline-block">승률 : </dt>
              <dd className="inline-block">{userInfo.winRate}%</dd>
              <dt className="font-bold inline-block">포인트 : </dt>
              <dd className="inline-block">{userInfo.point}P</dd>
              <dt className="font-bold inline-block">탈주 이력 : </dt>
              <dd className="inline-block">{userInfo.escapeHistory}회</dd>
              <dt className="font-bold inline-block">경험치 : </dt>
              <dd className="inline-block">{userInfo.exp}</dd>
            </dl>
          </div>
        </Link>
      )}
    </>
  )
}

export default UserInfo
