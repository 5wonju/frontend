import React, { useEffect, useState } from 'react'
import { RoomEditProps } from '../../lib/type'

const WriteRoomName = ({ roomInfo, setRoomInfo }: RoomEditProps) => {
  const [roomTitle, setRoomTitle] = useState(roomInfo.roomTitle || '')

  useEffect(() => {
    setRoomInfo((prev) => ({ ...prev, roomTitle }))
  }, [roomTitle])

  return (
    <div className="mt-2">
      <p className="block text-sm font-bold">Room Name</p>
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={roomTitle}
        onChange={(e) => setRoomTitle(e.target.value)}
        placeholder="방 제목을 입력하세요"
      />
    </div>
  )
}

export default WriteRoomName
