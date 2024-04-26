'use client'
import { useRouter } from 'next/navigation'
import { useSocketStore } from '../lib/store'
import { getSocketToken } from '../lib/api'

interface IChannelProps {
	channel: IChannelData
}

const RegionSelect = ({ channel }: IChannelProps) => {
	const router = useRouter()
	const { connect } = useSocketStore()

	const handleRegionSelect = async () => {
		const response = await getSocketToken()
		const newSocketToken = response.socketToken
		localStorage.setItem('socketToken', newSocketToken)
		await connect(channel.name, newSocketToken)
		router.push(`/lobby?region=${channel.name}`)
	}

	return (
		<button className="flex items-center justify-between w-96" onClick={handleRegionSelect}>
			<p>{channel.name}</p>
			<p>{channel.count}</p>
		</button>
	)
}

export default RegionSelect
