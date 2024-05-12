'use client'

import { useState } from 'react'
import { TbEditCircle } from 'react-icons/tb'
import WriteRoomName from '../../../lobby/component/CreateRoom/WriteRoomName'
import WriteRoomPw from '../../../lobby/component/CreateRoom/WriteRoomPw'
import SelectCategory from '../../../lobby/component/CreateRoom/SelectCategory'
import { useWaitingRoom } from '@/app/hooks/useSocket'
import SelectPlayerCount from '../../../lobby/component/CreateRoom/SelectPlayerCount'
import SelectGameMode from '../../../lobby/component/CreateRoom/SelectGameMode'
import WriteProblemNumber from '../../../lobby/component/CreateRoom/WriteProblemNumber'
import { IRoomInfo } from '../../../lobby/lib/type'
import { useGameRoomStore } from '../../lib/store'

const RoomEditButton = () => {
  const { roomInfo: prevRoomInfo } = useGameRoomStore((state) => ({ roomInfo: state.roomInfo }))

  const { editRoom } = useWaitingRoom()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({
    roomId: prevRoomInfo.roomId,
    roomTitle: prevRoomInfo.roomTitle,
    roomPW: prevRoomInfo.roomPW,
    probCategory: prevRoomInfo.probCategory,
    roomMode: prevRoomInfo.roomMode,
    maxUserNum: prevRoomInfo.maxUserNum ,
    probNum: prevRoomInfo.probNum,
  })

  const openEditRoomModal = () => {
    setIsModalOpen(true)
  }

  const closeEditRoomModal = () => {
    setIsModalOpen(false)
    setRoomInfo({
      roomId: prevRoomInfo.roomId,
      roomTitle: prevRoomInfo.roomTitle,
      roomPW: prevRoomInfo.roomPW,
      probCategory: prevRoomInfo.probCategory,
      roomMode: prevRoomInfo.roomMode,
      maxUserNum: prevRoomInfo.maxUserNum ,
      probNum: prevRoomInfo.probNum,
    })
  }

  const handleEditRoomInfo = () => {
    if (roomInfo) {
      editRoom(roomInfo)
      closeEditRoomModal()
    }
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

            <WriteRoomName roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
            <WriteRoomPw roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
            <SelectCategory roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
            <SelectPlayerCount roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
            <SelectGameMode roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
            <WriteProblemNumber roomInfo={roomInfo} setRoomInfo={setRoomInfo} />

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
