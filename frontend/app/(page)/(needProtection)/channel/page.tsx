'use client'
import { getChannelData, getChannelDataWithNextJS } from './lib/api'
import { cookies } from 'next/headers'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import ChannelList from './component/ChannelList'
import { Suspense } from 'react'
import RegionSelect from './component/RegionSelect'
import { verifyToken } from '@/app/lib/api'

const prefetchChannelData = async (token: string | undefined) => {
  if (!!token) return

  // enable 속성은 useQuery를 사용할 때마다 queryFn 호출 여부를 결정하는 속성입니다.
  // prefetchQuery는 마운트할 때 1번만 호출되므로 enable 속성을 사용할 수 없습니다.(사용할 필요도 없습니다.)
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['channel', token],
    queryFn: getChannelDataWithNextJS,
  })

  return dehydrate(queryClient)
}

const Channel = () => {
  console.log('Channel Page')
  // const cookieStore = cookies()
  // const token = cookieStore.get('accessToken')?.value
  // console.log(token)

  // 1. API ver.
  // const channelData: IChannelData[] | undefined = await getChannelData(token)

  // 2. ReactQuery ver.
  // const dehydratedChannelState = prefetchChannelData(token)
  // console.log(dehydratedChannelState)

  // queryClient.getQueryData()

  // const channelData = [
  //   { name: '구미', count: '654/1000' },
  //   { name: '서울', count: '200/1000' },
  //   { name: '아귀찮ㄷ', count: '23/321' },
  // ]

  return (
    <div className="flex flex-col">
      <h1>Channel</h1>
      {/* <HydrationBoundary state={dehydratedChannelState}> */}
      <ChannelList />
      {/* <Suspense fallback={<div>Loading...</div>}>
        {channelData.map((channel, index) => (
          <RegionSelect key={index} channel={channel} />
        ))}
      </Suspense> */}
      {/* </HydrationBoundary> */}
    </div>
  )
}

export default Channel
