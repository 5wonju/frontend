'use client'

import { useRouter } from 'next/router'
import { connectServerSocket, getSocketToken } from './lib/api'
import { useSocketStore } from './lib/store'

const serverData = [
	{ name: '구미', count: '654/1000' },
	{ name: '서울', count: '200/1000' },
	{ name: '아귀찮ㄷ', count: '23/321' },
]

const Channel = () => {
	const router = useRouter()
	const { connect } = useSocketStore()

	const handleRegionSelect = async (region: string) => {
		const response = await getSocketToken()
		const newSocketToken = response.socketToken
		localStorage.setItem('socketToken', newSocketToken)
		await connect(region, newSocketToken) // 실제 사용할 token 값 필요
		router.push(`/lobby?region=${region}`)
	}
	return (
		<div className="flex flex-col">
			<h1>Channel</h1>
			{serverData.map((data, key) => (
				<button
					key={key}
					className="flex items-center justify-between w-96"
					onClick={() => handleRegionSelect(data.name)}
				>
					<p>{data.name}</p>
					<p>{data.count}</p>
				</button>
			))}
			<div className="flex"></div>
		</div>
	)
}

export default Channel
