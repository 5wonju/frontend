'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import RegionSelect from './RegionSelect'
import { getChannelData } from '../lib/api'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/app/hooks/useSocket'

const ChannelList = () => {
  // const { data: channelData } = useQuery({
  //   queryKey: ['channel'],
  //   queryFn: getChannelData,
  // })
  const channelData = [
    { name: '서울', count: '1000/1000' }, // 포화 (750-1000)
    { name: '구미', count: '750/1000' }, // 혼잡 (500-749)
    { name: '대전', count: '500/1000' }, // 보통 (250-499)
    { name: '광주', count: '250/1000' }, // 쾌적 (0-249)
    { name: '부산', count: '0/1000' },
  ]
  
  const router = useRouter()
  const { socket, isConnected, connectSocket } = useSocket()
  const [selectedChannel, setSelectedChannel] = useState('')

  useEffect(() => {
    if (selectedChannel !== '') {
      connectSocket(selectedChannel)
    }
  }, [selectedChannel])

  useEffect(() => {
    if (isConnected && socket) {
      router.push(`/lobby?region=${selectedChannel}`)
    }
  }, [isConnected, socket])

  console.log('in list', channelData)
  return (
    <ul className="grid grid-cols-2 gap-4 max-w-5xl w-full min-w-3xl">
      {channelData?.map((data, key) => (
        <li key={key}>
          <RegionSelect channel={data} setSelectedChannel={setSelectedChannel} />
        </li>
      ))}
    </ul>
  )
}

export default ChannelList
