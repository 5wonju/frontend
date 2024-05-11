import { useWaitingRoom } from '@/app/hooks/useSocket'
import { useMainSocketStore } from '@/app/lib/store'
import { useState } from 'react'
import { isWaitingRoomData, validateCreateRoomData } from '../../lib/util'
import SelectCategory from './SelectCategory'
import SelectGameMode from './SelectGameMode'
import SelectPlayerCount from './SelectPlayerCount'
import WriteProblemNumber from './WriteProblemNumber'
import WriteRoomName from './WriteRoomName'
import WriteRoomPw from './WriteRoomPw'
import { IRoomInfo } from '../../lib/type'

export function CreateRoomModal({ onModalClose }: { onModalClose: () => void }) {
  // :: Room Data
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({
    roomTitle: null,
    roomPW: null,
    probCategory: ['개발'],
    roomMode: 'BASIC',
    maxUserNum: 2,
    probNum: 10,
  })

  const { socket } = useMainSocketStore() // zustand에서 소켓 가져오기
  const { createWaitingRoom } = useWaitingRoom() // 대기방 생성 함수 가져오기

  // :: Event Handlers
  // - 방 생성
  const handleCreateRoom = () => {
    // 데이터 및 소켓 유효성 검사
    if (socket === null) {
      alert('Socket is not connected')
      return
    }
    if (!validateCreateRoomData(roomInfo)) return

    // 소켓을 이용해서 메세지 보내기
    if (!isWaitingRoomData(roomInfo)) {
      alert('유효하지 데이터가 포함되어 있습니다.')
      return false
    } else {
      createWaitingRoom(roomInfo as IRoomInfo)
      onModalClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Create Room</h2>

        <WriteRoomName roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
        <WriteRoomPw roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
        <SelectCategory roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
        <SelectPlayerCount roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
        <SelectGameMode roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
        <WriteProblemNumber roomInfo={roomInfo} setRoomInfo={setRoomInfo} />

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
