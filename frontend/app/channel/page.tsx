'use client'

import { connectServerSocket, getSocketToken } from './lib/api'

const serverData = [
	{ name: '구미', count: '654/1000' },
	{ name: '서울', count: '200/1000' },
	{ name: '아귀찮ㄷ', count: '23/321' },
]

const Channel = () => {
	let ws
	const handleConnectSocket = async (region: string) => {
		const response = await getSocketToken()
		const newSocketToken = response.socketToken
		localStorage.setItem('socketToken', newSocketToken)
		ws = await connectServerSocket(region, newSocketToken)
	}
	return (
		<div className="flex flex-col">
			<h1>Channel</h1>
			{serverData.map((data, key) => (
				<button
					key={key}
					className="flex items-center justify-between w-96"
					onClick={() => handleConnectSocket(data.name)}
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
