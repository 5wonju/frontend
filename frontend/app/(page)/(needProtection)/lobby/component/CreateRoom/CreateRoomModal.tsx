import React, { useEffect, useState } from 'react'
import SelectPlayerCount from './SelectPlayerCount'
import SelectGameMode from './SelectGameMode'
import WriteRoomName from './WriteRoomName'
import WriteRoomPw from './WriteRoomPw'
import SelectCategory from './SelectCategory'
import WriteProblemNumber from './WriteProblemNumber'
import { isWaitingRoomData, validateCreateRoomData } from '../../lib/util'
import { useWaitingRoom } from '@/app/hooks/useSocket'
import { useMainSocketStore } from '../../../channel/lib/store'
import { ICreatedRoom } from '../../lib/type'

export function CreateRoomModal({ onModalClose }: { onModalClose: () => void }) {
  // :: Room Data
  const [roomName, setRoomName] = useState('')
  const [roomPw, setRoomPw] = useState('')
  const [probCategory, setProbCategory] = useState('개발')
  const [playerCount, setPlayerCount] = useState(2)
  const [gameMode, setGameMode] = useState('basic')
  const [probNum, setProbNum] = useState(10)

  const { socket } = useMainSocketStore() // zustand에서 소켓 가져오기
  const { createWaitingRoom } = useWaitingRoom() // 대기방 생성 함수 가져오기

  // :: Event Handlers
  // - 방 생성
  const handleCreateRoom = () => {
    const roomData = {
      roomTitle: roomName,
      roomPW: roomPw,
      probCategory: [probCategory],
      maxUserNum: playerCount,
      roomMode: gameMode,
      probNum,
    }

    // 데이터 및 소켓 유효성 검사
    if (socket === null) {
      alert('Socket is not connected')
      return
    }
    if (!validateCreateRoomData(roomData)) return

    // 소켓을 이용해서 메세지 보내기
    if (!isWaitingRoomData(roomData)) {
      alert('유효하지 데이터가 포함되어 있습니다.')
      return false
    } else {
      createWaitingRoom(roomData as ICreatedRoom)
      onModalClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Create Room</h2>

        <WriteRoomName roomName={roomName} setRoomName={setRoomName} />
        <WriteRoomPw roomPw={roomPw} setRoomPw={setRoomPw} />
        <SelectCategory probCategory={probCategory} setProbCategory={setProbCategory} />
        <SelectPlayerCount playerCount={playerCount} setPlayerCount={setPlayerCount} />
        <SelectGameMode gameMode={gameMode} setGameMode={setGameMode} />
        <WriteProblemNumber probNum={probNum} setProbNum={setProbNum} />

        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onModalClose}>
            취소
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={handleCreateRoom}>
            방 생성
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateRoomModal
