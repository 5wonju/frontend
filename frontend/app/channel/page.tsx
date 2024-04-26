import { getChannelData } from './lib/api'
import RegionSelect from './ui/RegionSelect'

const Channel = async () => {
	const channelData: IChannelData[] = await getChannelData()
	return (
		<div className="flex flex-col">
			<h1>Channel</h1>
			{channelData.map((data, key) => (
				<RegionSelect key={key} channel={data} />
			))}
		</div>
	)
}

export default Channel
