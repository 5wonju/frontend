'use client'

import { useAuth } from '@/app/hooks/useAuth'
import WaitingRoomList from './component/WaitingRoomList'
import { useEffect } from 'react'
import UserInfo from '@/app/component/UserInfo'
import Chat from '@/app/component/Chat'

const Lobby = () => {
  const { refetch } = useAuth()

  useEffect(() => {
    refetch()
  }, [])

  return (
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
  )
}

export default Lobby
