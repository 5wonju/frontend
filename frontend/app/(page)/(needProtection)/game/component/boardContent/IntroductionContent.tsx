import RoomInfo from "./RoomInfo"


const IntroductionContent = () => {
  const roomId = 2
  return (
    <div className="select-none">
      <RoomInfo roomId={roomId} />
    </div>
  )
}

export default IntroductionContent
