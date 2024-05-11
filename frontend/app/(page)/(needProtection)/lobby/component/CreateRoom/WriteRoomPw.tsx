'use client'
import React, { useState } from 'react'
import { RoomEditProps } from '../../lib/type'

const WriteRoomPw = ({ roomInfo, setRoomInfo }: RoomEditProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Room Password (옵션)</label>
      <div className="relative">
        {roomInfo.roomPW && (
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            value={roomInfo.roomPW}
            onChange={(e) => setRoomInfo((prev) => ({ ...prev, roomPW: e.target.value }))}
            placeholder="4자 이상 입력해주세요"
            className="w-full border p-2 rounded"
          />
        )}
        <button
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute inset-y-0 right-2 p-1"
        >
          {isPasswordVisible ? (
            <p className="text-red-500 text-xs">shown</p>
          ) : (
            <p className="text-green-500 text-xs">hidden</p>
          )}
          {/* 아이콘을 이용한 version */}
          {/* {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />} */}
        </button>
      </div>
    </div>
  )
}

export default WriteRoomPw
