'use client'

import React, { useEffect } from 'react'
import WaitingRoom from './WaitingRoom'
import { useWaitingRoomStore } from '../lib/store'
import { useSocketStore } from '../../channel/lib/store'
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
      {roomList.map((room) => (
        <WaitingRoom key={room.roomId} room={room} />
      ))}
    </div>
  )
}

export default WaitingRoomList
