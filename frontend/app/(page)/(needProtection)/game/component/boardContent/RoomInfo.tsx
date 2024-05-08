const roomInfo = {
  roomId: 2, // room pk
  roomName: '파이썬 1:1 초보만', // 방 제목
  playerCnt: 8, // 게임방 정원
  round: 10, // 라운드 수 (문제 수)
  probCategory: 'CS', // 문제 카테고리
  isLocked: true, // 비밀방 여부
  mode: 'basic', // 게임 모드 (윷놀이 or 퀴즈)
}

const RoomInfo = ({ roomId }: { roomId: number }) => {
  // TODO: roomId로 roomInfo를 가져와야 함

  return (
    <h1 className="glass flex justify-between text-black px-5">
      <fieldset className="flex gap-3">
        <span>{roomInfo.roomId.toString().padStart(3, '0')}</span>
        <span>{roomInfo.roomName}</span>
      </fieldset>
      <fieldset className="flex gap-3">
        <span>{roomInfo.probCategory}</span>
        <span>{roomInfo.round} Round</span>
        {/* 게임 시작 후에 보일 부분 */}
        <span>2/8</span>
      </fieldset>
    </h1>
  )
}

export default RoomInfo
