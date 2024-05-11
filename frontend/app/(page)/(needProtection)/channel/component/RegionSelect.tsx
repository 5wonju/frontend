'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/app/hooks/useSocket'
import { getCongestion } from '../lib/util'
import { ArrowRightIcon } from 'lucide-react'
// import { useSocketStore } from '../lib/store'
// import { getSocketToken } from '../lib/api'

const RegionSelect = ({ channel }: { channel: IChannelData }) => {
  const router = useRouter()
  // const { connect } = useSocketStore()
  const { socket, connectSocket, isConnected } = useSocket()
  const channelData = useMemo(() => {
    const currentUsers = parseInt(channel.count.split('/')[0])
    const maxUsers = parseInt(channel.count.split('/')[1])

    return {
      region: channel.name,
      currentUsers,
      maxUsers,
      congestion: getCongestion(currentUsers),
    }
  }, [channel])

  useEffect(() => {
    if (isConnected && socket) {
      console.log(socket)
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
      <p>{channelData.region}</p>
      <p>
        {channelData.currentUsers}/{channelData.maxUsers}
      </p>
      <p>{channelData.congestion}</p>
      {/* lucid-react를 사용한 오른쪽 화살표 버튼 */}
      <ArrowRightIcon className="w-6 h-6" />
    </button>
  )
}

export default RegionSelect
