'use client'
import { useRouter } from 'next/navigation'
import { useSocketStore } from '../lib/store'
import { getSocketToken } from '../lib/api'

const RegionSelect = ({ channel }: { channel: IChannelData }) => {
  const router = useRouter()
  const { connect } = useSocketStore()

  const handleRegionSelect = async () => {
    const response = await getSocketToken()
    localStorage.setItem('socketToken', response.data)
    await connect(channel.name, response.data)
    router.push(`/lobby?region=${channel.name}`)
  }

  return (
    <button className="flex items-center justify-between w-96" onClick={handleRegionSelect}>
      <p>{channel.name}</p>
      <p>{channel.count}</p>
    </button>
  )
}

export default RegionSelect
