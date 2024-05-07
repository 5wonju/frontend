'use client'

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import RoomPasswordModal from './RoomPasswordModal'
import { canEnterRoom } from '../lib/util'
import clsx from 'clsx'
import { useEnterRoom } from '../hooks/enterRoom'
import { useWaitingRoom } from '@/app/hooks/socket'

interface RoomProps {
  room: WaitingRoom
}

const WaitingRoom = ({ room }: RoomProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { enterRoom } = useWaitingRoom()

  const handleRoomClick = () => {
    // 비밀번호 방 클릭 시
    if (room.isHavePW) {
      canEnterRoom(room) && setModalOpen(true)
    }
    // 비밀번호 없는 방 클릭 시
    else {
      enterRoom(room.roomId)
    }
  }

  const submitPassword = (password: string) => {
    console.log('Password entered:', password)
    enterRoom(room.roomId, password)
    setModalOpen(false)
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    console.log('try to close modal')
    setModalOpen(false)
  }

  return (
    <div
      onClick={handleRoomClick}
      className={clsx('p-4 rounded-lg shadow-md flex items-center gap-6 text-black', {
        'border-2 border-red-500': room.isRoomFull,
        'border-2 border-gray-500': !room.isRoomFull,
        'bg-gray-500': room.isGameStart,
        'bg-white': !room.isGameStart,
      })}
      // className={`p-4 rounded-lg shadow-md flex items-center gap-6 ${
      // 	room.isRoomFull ? 'border-2 border-red-500' : 'border-2 border-gray-200'
      // }`}
    >
      <div className="text-lg font-bold">{room.roomId}</div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{room.roomTitle}</h2>
        <p>{`${room.roomMode} / ${room.probCategory}`}</p>
        <p>Problems: {room.totalRound}</p>
      </div>
      <div className="text-right">
        <p>{`${room.roomCurUserNum}/${room.roomMaxUserNum}`}</p>
        {room.isHavePW && <Lock size={24} />}
      </div>
      <RoomPasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        submitPassword={submitPassword}
      />
    </div>
  )
}

export default WaitingRoom
