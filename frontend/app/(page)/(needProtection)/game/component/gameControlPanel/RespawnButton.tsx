import { GrPowerCycle } from 'react-icons/gr'

const RespawnButton = () => {
  const handleRespawn = () => {
    console.log('중앙 리스폰 얍!')
  }

  return (
    <div onClick={handleRespawn} className="icon-btn">
      <GrPowerCycle className="size-8 m-auto text-center" />
    </div>
  )
}

export default RespawnButton
