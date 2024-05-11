'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/app/hooks/useSocket'
// import { useSocketStore } from '../lib/store'
// import { getSocketToken } from '../lib/api'

const RegionSelect = ({ channel }: { channel: IChannelData }) => {
  const router = useRouter()
  // const { connect } = useSocketStore()
  const { socket, connectSocket, isConnected } = useSocket()

  useEffect(() => {
    if (isConnected && socket) {
      console.log('채널 선택 후 소켓 연결 완료.')
      router.push(`/lobby?region=${channel.name}`)
    }
  }, [isConnected, socket])

  const handleRegionSelect = async () => {
    await connectSocket(channel.name)
  }

  // const handleRegionSelect = async () => {
  //   const response = await getSocketToken()
  //   localStorage.setItem('socketToken', response.data)
  //   await connect(channel.name, response.data)
  //   router.push(`/lobby?region=${channel.name}`)
  // }

  return (
    <button className="flex items-center justify-between w-96" onClick={handleRegionSelect}>
      <p>{channel.name}</p>
      <p>{channel.count}</p>
    </button>
  )
}

export default RegionSelect
