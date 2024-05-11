'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import RegionSelect from './RegionSelect'
import { getChannelData, getChannelDataWithNextJS } from '../lib/api'

const ChannelList = () => {
  const { data: channelData } = useQuery({
    queryKey: ['channel'],
    queryFn: getChannelData,
  })

  console.log('in list', channelData)
  return (
    <ul className="grid grid-cols-2 gap-4 max-w-5xl w-full min-w-3xl">
      {channelData?.map((data, key) => (
        <li key={key}>
          <RegionSelect channel={data} />
        </li>
      ))}
    </ul>
  )
}

export default ChannelList
