import React from 'react'
import { RoomEditProps } from '../../lib/type'

const WriteRoomName = ({ roomInfo, setRoomInfo }: RoomEditProps) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Room Name</label>
      {roomInfo.roomTitle && (
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={roomInfo.roomTitle}
          onChange={(e) => setRoomInfo((prev) => ({ ...prev, roomTitle: e.target.value }))}
          placeholder="Enter room name"
        />
      )}
    </div>
  )
}

export default WriteRoomName
