'use client'

import React from 'react'
import { Lock } from 'lucide-react'

interface RoomProps {
	room: Room
}

const WaitingRoom = ({ room }: RoomProps) => {
	return (
		<div
			className={`p-4 rounded-lg shadow-md flex items-center gap-6 ${
				room.isRoomFull ? 'border-2 border-red-500' : 'border-2 border-gray-200'
			}`}
		>
			<div className="text-lg font-bold">{room.roomId}</div>
			<div className="flex-grow">
				<h2 className="text-xl font-semibold">{room.roomTitle}</h2>
				<p>{`${room.roomMode} / ${room.probCategory}`}</p>
				<p>Problems: {room.totalRound}</p>
			</div>
			<div className="text-right">
				<p>{`${room.roomCurUserNum}/${room.roomMaxUserNum}`}</p>
				{room.isHavePW && <Lock size={24} />}
			</div>
		</div>
	)
}

export default WaitingRoom
