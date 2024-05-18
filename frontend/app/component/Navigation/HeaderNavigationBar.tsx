'use client'
import React, { useEffect, useState } from 'react'
import CreateRoomButton from './CreateRoomButton'
import QuickStart from './QuickStart'
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import LogoutButton from './LogoutButton'
import ExitLobbyButton from './ExitLobbyButton'
import ExitGameButton from './ExitGameButton'
import GoBackButton from './GoBackButton'
import BgmPlayer from '../AudioPlayer/BgmPlayer'

// 1. 메인 페이지
// - 로고

// 2. 채널 페이지
// - 로고
// - 서비스 나가기 버튼 (사실상 로그아웃)

// 3. 로비 페이지(대기방 페이지)
// - 로고
// - 방 생성 버튼
// - 빠른 시작 버튼
// - 체널 나가기 버튼

// 4. 게임 페이지
// - 로고
// - 노래 설정 버튼
// - 게임 나가기 버튼

// 5. 마이페이지
// - 로고
// - 돌아가기 버튼

const renderChannelNavbarButtons = () => {
  return (
    <>
      <LogoutButton />
    </>
  )
}
const renderLobbyNavbarButtons = () => {
  return (
    <>
      <CreateRoomButton />
      <QuickStart />
      <ExitLobbyButton />
      <LogoutButton />
    </>
  )
}
const renderGameNavbarButtons = () => {
  return (
    <>
      <BgmPlayer />
      <ExitGameButton />
    </>
  )
}

const renderMyPageNavbarButtons = () => {
  return (
    <>
      <GoBackButton />
    </>
  )
}

const conditionalNavbarInfo: Record<string, () => React.JSX.Element> = {
  '/channel': renderChannelNavbarButtons,
  '/lobby': renderLobbyNavbarButtons,
  '/game': renderGameNavbarButtons,
  '/mypage': renderMyPageNavbarButtons,
}

const HeaderNavigationBar = () => {
  const currentPath = usePathname()
  const [currentNavbarButtonList, setCurrentNavbarButtonList] = useState<React.JSX.Element>(
    conditionalNavbarInfo[currentPath] ? conditionalNavbarInfo[currentPath]() : <></>
  )
  useEffect(() => {
    setCurrentNavbarButtonList(
      conditionalNavbarInfo[currentPath] ? conditionalNavbarInfo[currentPath]() : <></>
    )
  }, [currentPath])

  return (
    <section className="flex justify-between items-center absolute bg-white top-0 h-12 w-full px-4 select-none">
      <div>
        <h1 className="text-purple-300 font-bold my-auto text-center text-2xl px-3">
          <Link href="/">LOGO</Link>
        </h1>
      </div>

      <div className="flex gap-3">{currentNavbarButtonList}</div>
    </section>
  )
}

export default HeaderNavigationBar
