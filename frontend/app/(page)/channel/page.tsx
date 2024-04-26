import { getChannelData } from './lib/api'
import RegionSelect from './component/RegionSelect'
import { Suspense } from 'react'

const Channel = async () => {
	// const channelData: IChannelData[] | undefined = await getChannelData()
	const channelData = [
		{ name: '구미', count: '654/1000' },
		{ name: '서울', count: '200/1000' },
		{ name: '아귀찮ㄷ', count: '23/321' },
	]
	return (
		<div className="flex flex-col">
			<h1>Channel</h1>
			<Suspense fallback={<div>Loading...</div>}>
				{channelData.map((data, key) => (
					<RegionSelect key={key} channel={data} />
				))}
			</Suspense>
		</div>
	)
}

export default Channel
