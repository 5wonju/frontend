'use client'

import React, { useEffect } from 'react'
import WaitingRoom from './WaitingRoom'
import { useWaitingRoomStore } from '../lib/store'
import { generateRooms } from '../lib/util'

const WaitingRoomList: React.FC = () => {
	// const { roomList } = useWaitingRoomStore()

	const [roomList, setRoomList] = React.useState<WaitingRoom[]>([])
	useEffect(() => {
		setRoomList(generateRooms())
	}, [])
	useEffect(() => {
		console.log('rooms', roomList)
	}, [roomList])

	return (
		<div className="grid grid-cols-2 gap-4">
			{roomList.map((room) => (
				<WaitingRoom key={room.roomId} room={room} />
			))}
		</div>
	)
}

export default WaitingRoomList
