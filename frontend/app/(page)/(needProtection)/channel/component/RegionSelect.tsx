'use client'

import { useMemo } from 'react'
import clsx from 'clsx'
import { getCongestion } from '../lib/util'
import { ArrowRightIcon } from 'lucide-react'

const RegionSelect = ({
  channel,
  setSelectedChannel,
}: {
  channel: IChannelData
  setSelectedChannel: React.Dispatch<React.SetStateAction<string>>
}) => {
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

  const handleRegionSelect = async () => {
    setSelectedChannel(channel.name)
  }

  return (
    <button
      className={clsx(
        'group flex items-center justify-between w-full text-xl font-bold text-black border-[3px] border-darkGray3 rounded px-12 py-12',
        {
          ' hover:border-green-500': channelData.congestion === '쾌적',
          ' hover:border-yellow-400': channelData.congestion === '보통',
          ' hover:border-orange-500': channelData.congestion === '혼잡',
          ' hover:border-pink-500': channelData.congestion === '포화',
        }
      )}
      onClick={handleRegionSelect}
    >
      <p className="font-bold text-3xl">{channelData.region}</p>
      <p className={clsx('text-lightGray1 font-medium group-hover:text-black', {})}>
        {channelData.currentUsers} / {channelData.maxUsers}
      </p>
      <p
        className={clsx('text-2xl', {
          'text-green-500': channelData.congestion === '쾌적',
          'text-yellow-400': channelData.congestion === '보통',
          'text-orange-500': channelData.congestion === '혼잡',
          'text-pink-500': channelData.congestion === '포화',
        })}
      >
        {channelData.congestion}
      </p>
      <ArrowRightIcon className={clsx('w-8 h-8')} />
    </button>
  )
}

export default RegionSelect
