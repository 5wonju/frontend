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
    <ul>
      {channelData?.map((data, key) => (
        <li key={key}>
          <RegionSelect channel={data} />
        </li>
      ))}
    </ul>
  )
}

export default ChannelList
