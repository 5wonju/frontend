import RoomInfo from './RoomInfo'

const IntroductionContent = () => {
  const roomId = 2
  return (
    <div className="select-none flex flex-col justify-around h-full">
      <RoomInfo roomId={roomId} />
      <fieldset className="flex flex-col gap-4 pt-2 items-center justify-around text-black">
        {/* TODO: 문구 의논해서 정하기 */}
        <h2 className="text-4xl font-medium">원하는 팀을 고르세요</h2>
        <div className="text-md flex flex-col items-center gap-1">
          <p>
            <span className="text-red-500">RED</span> 혹은
            <span className="text-blue-500">BLUE</span> 필드로 이동해 팀을 선택하세요
          </p>
          <p className="text-md text-center">
            우측 하단의
            <span className="bg-indigo-600 rounded-full px-2 py-1 mx-2 text-white">
              캐릭터 변경
            </span>
            버튼을 눌러 캐릭터를 변경해 보세요
          </p>
        </div>
      </fieldset>
    </div>
  )
}

export default IntroductionContent
