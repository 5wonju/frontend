import { useGameRoomStore } from '../../lib/store'

const RoomInfo = ({ quizNum = 0 }: { quizNum?: number }) => {
  const { roomInfo } = useGameRoomStore((state) => ({ roomInfo: state.roomInfo }))
  // TODO: UI 수정 필요 (텍스트 데이터가 너무 많음)
  return (
    <h1 className="glass fixed top-2 right-2 left-2 grid grid-cols-3 justify-between text-darkGray1 px-5">
      {roomInfo && (
        <>
          <fieldset className="col-span-1 flex justify-start gap-3">
            <span>{roomInfo.roomId && roomInfo.roomId.toString().padStart(3, '0')}</span>
            <span>{roomInfo.roomTitle}</span>
          </fieldset>

          <fieldset className={`col-span-1 text-center font-semibold ${quizNum === 0 ? 'invisible' : ''}`}>
            <span>라운드 {quizNum}</span>
          </fieldset>

          <fieldset className="col-span-1 flex justify-end gap-3">
            <span>{roomInfo.roomMode}</span>
            <span>{roomInfo.probCategory}</span>
            <span>{roomInfo.probNum} Round</span>
            {/* 게임 시작 후에 보일 부분 */}
            <span>{quizNum}/{roomInfo.probNum}</span>
          </fieldset>
        </>
      )}
    </h1>
  )
}

export default RoomInfo
