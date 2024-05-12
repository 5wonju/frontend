'use client'

import React, { useEffect } from 'react'
import WaitingRoomList from './component/WaitingRoomList'
import UserInfo from '@/app/component/UserInfo'
import { useSetupSocket } from './../../../hooks/useSetupSocket'
import { useMainSocketStore } from '@/app/lib/store'
import LobbyChat from './component/LobbyChat/LobbyChat'

// overflow-y-scroll box-border
const Lobby = () => {
  const { socket } = useMainSocketStore()
  useSetupSocket(socket)

  return (
    <main className="grid grid-cols-3 grid-rows-3 h-[calc(100vh-3.5rem)]">
      <section className="col-span-3 row-span-2 ">
        <WaitingRoomList />
      </section>
      <div className="col-span-3 grid grid-cols-3">
        <section className="col-span-1">
          <UserInfo />
        </section>
        <section className="col-span-2 relative ">
          <LobbyChat />
        </section>
      </div>
    </main>
  )
}

export default Lobby
