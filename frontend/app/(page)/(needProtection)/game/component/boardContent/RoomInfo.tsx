import { useGameRoomStore } from '../../lib/store'

const RoomInfo = () => {
  const { roomInfo } = useGameRoomStore((state) => ({ roomInfo: state.roomInfo }))
  // TODO: UI 수정 필요 (텍스트 데이터가 너무 많음)
  return (
    <h1 className="glass fixed top-2 right-2 left-2 flex justify-between text-darkGray1 px-5">
      {roomInfo && (
        <>
          <fieldset className="flex gap-3">
            <span>{roomInfo.roomId && roomInfo.roomId.toString().padStart(3, '0')}</span>
            <span>{roomInfo.roomTitle}</span>
          </fieldset>
          <fieldset className="flex gap-3">
            <span>{roomInfo.roomMode}</span>
            <span>{roomInfo.probCategory}</span>
            <span>{roomInfo.probNum} Round</span>
            {/* 게임 시작 후에 보일 부분 */}
            <span>2/8</span>
          </fieldset>
        </>
      )}
    </h1>
  )
}

export default RoomInfo
