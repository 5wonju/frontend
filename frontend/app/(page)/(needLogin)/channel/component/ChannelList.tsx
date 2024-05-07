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
    <>
      {channelData?.map((data, key) => (
        <RegionSelect key={key} channel={data} />
      ))}
    </>
  )
}

export default ChannelList