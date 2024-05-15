import { GrPowerCycle } from 'react-icons/gr'
import { useRespawnButtonStore } from '../../lib/store'

const RespawnButton = () => {
  const { setRespawnButton } = useRespawnButtonStore()

  const handleRespawn = () => {
    console.log('중앙 리스폰 얍!')
    setRespawnButton(true)
  }

  return (
    <div onClick={handleRespawn} className="icon-btn">
      <GrPowerCycle className="size-8 m-auto text-center" />
    </div>
  )
}

export default RespawnButton
