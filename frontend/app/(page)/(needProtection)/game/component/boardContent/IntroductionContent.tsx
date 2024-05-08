import RoomInfo from './RoomInfo'

const IntroductionContent = () => {
  const roomId = 2
  return (
    <div className="select-none flex flex-col justify-around h-full">
      <RoomInfo roomId={roomId} />
      <fieldset className="flex flex-col gap-4 pt-2 items-center justify-around text-black">
        {/* TODO: 문구 의논해서 정하기 */}
        <h2 className="text-4xl font-medium">원하는 팀을 선택하세요</h2>
        <p className="text-md">
          <span className="text-red-500">RED</span> 혹은{' '}
          <span className="text-blue-500">BLUE</span> 필드로 이동해 팀을 선택하세요
        </p>
      </fieldset>
    </div>
  )
}

export default IntroductionContent
