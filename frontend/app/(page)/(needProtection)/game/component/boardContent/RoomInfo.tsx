import { useCurrentRoomStore } from '../../../lobby/lib/store'

const RoomInfo = () => {
  const { room } = useCurrentRoomStore()
  // TODO: UI 수정 필요 (텍스트 데이터가 너무 많음)
  return (
    <h1 className="glass fixed top-2 right-2 left-2 flex justify-between text-darkGray1 px-5">
      {room && (
        <>
          <fieldset className="flex gap-3">
            <span>{room.roomId && room.roomId.toString().padStart(3, '0')}</span>
            <span>{room.roomTitle}</span>
          </fieldset>
          <fieldset className="flex gap-3">
            <span>{room.roomMode}</span>
            <span>{room.probCategory}</span>
            <span>{room.totalRound} Round</span>
            {/* 게임 시작 후에 보일 부분 */}
            <span>2/8</span>
          </fieldset>
        </>
      )}
    </h1>
  )
}

export default RoomInfo
