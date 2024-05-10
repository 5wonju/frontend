'use client'

import React, { useEffect } from 'react'
import WaitingRoomList from './component/WaitingRoomList'
import UserInfo from '@/app/component/UserInfo'
import Chat from '@/app/component/Chat'
import { useMainSocketStore } from '../channel/lib/store'
import ProtectedSocket from '@/app/component/ProtectionComponent/ProtectedSocket'
import { useSetupSocket } from './../../../hooks/useSetupSocket'

// overflow-y-scroll box-border
const Lobby = () => {
  const { socket } = useMainSocketStore()
  useSetupSocket(socket)

  return (
    <main className="grid grid-cols-3 grid-rows-3 h-[calc(100vh-3.5rem)]">
      <section className="col-span-3 row-span-2 ">
        <WaitingRoomList />
      </section>
      <div className="flex col-span-3 gap-6">
        <section className="">
          <UserInfo />
        </section>
        <section className="">
          <Chat />
        </section>
      </div>
    </main>
  )
}

export default Lobby
