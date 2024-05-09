import { useGameSocketStore } from '@/app/lib/store'
import { canEnterRoom } from '../lib/util'
import { useMainSocketStore } from '../../channel/lib/store'
import { useSocket } from '@/app/hooks/useSocket'

// 1. api를 통해서 옳바른 방입장인지 확인
// 2. socket 연결을 통해서 방과 connect -> 아마 hook으로 작성될 것
export const useEnterRoom = () => {
  const { gameSocket } = useGameSocketStore()
  const { socket } = useSocket();

  // 소켓을 통해 입장하는 방에 대한 정보를 서버에게 전달
  const sendEnterRoom = (room: WaitingRoom, password?: string) => {
    if (!canEnterRoom(room)) {
      return
    }
    if (socket === null) {
      alert('Socket not connected')
      return
    }
    const message = JSON.stringify({
      type: 'enter_room',
      roomId: room.roomId,
      password: password ? password : null,
    })

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    } else {
      console.error('Socket not connected')
    }
  }

  return { sendEnterRoom }
}
