'use client'

import React, { useEffect } from 'react'
import WaitingRoom from './WaitingRoom'
import { useWaitingRoomStore } from '../lib/store'
import { useWaitingRoom } from '@/app/hooks/useSocket'
// import { generateRooms } from '../lib/util'

const WaitingRoomList: React.FC = () => {
  // 1. socket 통신 ver.
  const { roomList } = useWaitingRoomStore()
  const { getInitialRoomList } = useWaitingRoom()

  useEffect(() => {
    getInitialRoomList()
  }, [])

  // 2. 더미 데이터 ver.
  // const [roomList, setRoomList] = React.useState<WaitingRoom[]>([])
  // useEffect(() => {
  //   setRoomList(generateRooms())
  // }, [])
  // useEffect(() => {
  //   console.log('rooms', roomList)
  // }, [roomList])

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {roomList.length > 0 ? (
        roomList.map((room) => <WaitingRoom key={room.roomId} room={room} />)
      ) : (
        <fieldset className="flex flex-col gap-2 justify-center h-[calc(100vh/2)] items-center col-span-2 pb-10 text-black select-none">
          <p className="text-xl">현재 만들어진 방이 없습니다 👀</p>
          <p className='font-light text-darkGray2'>새로운 방을 만들어 보세요</p>
        </fieldset>
      )}
    </div>
  )
}

export default WaitingRoomList
