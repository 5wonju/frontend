'use client'

import React, { useEffect } from 'react'
import WaitingRoomList from './component/WaitingRoomList'
import UserInfo from '@/app/component/UserInfo'
import Chat from '@/app/component/Chat'
import { useMainSocketStore } from '../channel/lib/store'
import { useRouter } from 'next/navigation'
import ProtectedSocket from '@/app/component/ProtectionComponent/ProtectedSocket'

const Lobby = () => {
  return (
    <ProtectedSocket>
      <main className="grid grid-cols-3 grid-rows-3 h-[calc(100vh-48px)]">
        <section className="col-span-3 row-span-2 overflow-y-scroll">
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
    </ProtectedSocket>
  )
}

export default Lobby
