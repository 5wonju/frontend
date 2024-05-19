'use client'

import React from 'react'
import { IRoomInfo, RoomEditProps } from '../../lib/type'

const WriteProblemNumber = ({ roomInfo, setRoomInfo }: RoomEditProps) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Problem Number (10-100)</label>
      {roomInfo.probNum && (
        <input
          type="number"
          value={roomInfo.probNum}
          onChange={(e) => setRoomInfo((prev) => ({ ...prev, probNum: Number(e.target.value) }))}
          placeholder="Enter problem number"
          min="1"
          max="100"
          className="w-full border p-2 rounded"
        />
      )}
    </div>
  )
}

export default WriteProblemNumber
