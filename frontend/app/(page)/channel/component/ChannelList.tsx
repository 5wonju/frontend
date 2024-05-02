'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import RegionSelect from './RegionSelect'
import { getChannelDataWithNextJS } from '../lib/api'

interface ChannelListProps {
	token: string | undefined
}

const ChannelList = ({ token }: ChannelListProps) => {
	const { data: channelData } = useQuery({
		queryKey: ['channel', token],
		queryFn: getChannelDataWithNextJS,
		enabled: !!token,
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
