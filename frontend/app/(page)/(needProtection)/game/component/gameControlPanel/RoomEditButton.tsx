'use client'

import { useState } from 'react'
import { TbEditCircle } from 'react-icons/tb'
import { useCurrentRoomStore } from '../../../lobby/lib/store'
import WriteRoomName from '../../../lobby/component/CreateRoom/WriteRoomName'
import WriteRoomPw from '../../../lobby/component/CreateRoom/WriteRoomPw'
import SelectCategory from '../../../lobby/component/CreateRoom/SelectCategory'
import { useWaitingRoom } from '@/app/hooks/useSocket'
import { IEditRoom } from '../../../lobby/lib/type'

const RoomEditButton = () => {
  const { room } = useCurrentRoomStore((state) => ({
    room: state.room,
  }))
  const { editRoom } = useWaitingRoom()

  const [isModalOpen, setIsModalOpen] = useState(false)

  // 수정할 room 정보
  const [roomName, setRoomName] = useState(room.roomTitle)
  const [roomPw, setRoomPw] = useState('')
  const [probCategory, setProbCategory] = useState(room.probCategory)

  const openEditRoomModal = () => {
    setIsModalOpen(true)
  }

  const closeEditRoomModal = () => {
    setIsModalOpen(false)
  }

  const handleEditRoomInfo = () => {
    // 방 정보 수정
    editRoom({
      roomTitle: roomName,
      roomPW: roomPw,
      probCategory: probCategory,
    } as IEditRoom)
  }

  return (
    <>
      <button onClick={openEditRoomModal} className="icon-btn">
        <TbEditCircle className="size-8" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 glass">
          <div className="bg-white p-4 rounded-lg shadow-lg select-none">
            <h2 className="text-lg font-bold text-black">방 정보 수정하기</h2>

            <WriteRoomName roomName={roomName!} setRoomName={setRoomName} />
            {room.hasPassword && <WriteRoomPw roomPw={roomPw} setRoomPw={setRoomPw} />}
            <SelectCategory probCategory={probCategory!} setProbCategory={setProbCategory} />

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-black"
                onClick={closeEditRoomModal}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded"
                onClick={handleEditRoomInfo}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoomEditButton
