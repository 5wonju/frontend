'use client'

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import RoomPasswordModal from './RoomPasswordModal'

interface RoomProps {
	room: Room
}

const WaitingRoom = ({ room }: RoomProps) => {
	const [isModalOpen, setModalOpen] = useState(false)

	const handleRoomClick = () => {
		if (room.isHavePW) {
			setModalOpen(true)
		} else {
			// Todo : 방 입장 로직(유효성 검증 및 소켓 연결 로직 작성 필요)
			// enterRoom(room)
			console.log('Entering room without password')
		}
	}

	const submitPassword = (password: string) => {
		console.log('Password entered:', password)
		// Todo : 방 입장 로직(유효성 검증 및 소켓 연결 로직 작성 필요)
		// enterRoom(room, password)
		setModalOpen(false)
	}

	const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		console.log('try to close modal')
		setModalOpen(false)
	}

	return (
		<div
			onClick={handleRoomClick}
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
			<RoomPasswordModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				submitPassword={submitPassword}
			/>
		</div>
	)
}

export default WaitingRoom
