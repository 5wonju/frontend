'use client'

import React, { useEffect } from 'react'
import WaitingRoom from './WaitingRoom'
import { generateRooms } from '../lib/util'

const WaitingRoomList: React.FC = () => {
	const [rooms, setRooms] = React.useState<Room[]>([])
	useEffect(() => {
		setRooms(generateRooms())
	}, [])
	useEffect(() => {
		console.log('rooms', rooms)
	}, [rooms])

	// const roomsData = generateRooms()

	return (
		<div className="grid grid-cols-2 gap-4">
			{rooms.map((room) => (
				<WaitingRoom key={room.roomId} room={room} />
			))}
		</div>
	)
}

export default WaitingRoomList
