import React from 'react'

interface WriteRoomNameProps {
	roomName: string
	setRoomName: (name: string) => void
}

const WriteRoomName = ({ roomName, setRoomName }: WriteRoomNameProps) => {
	return (
		<div className="mt-2">
			<label className="block text-sm font-bold">Room Name</label>
			<input
				type="text"
				className="w-full border p-2 rounded"
				value={roomName}
				onChange={(e) => setRoomName(e.target.value)}
				placeholder="Enter room name"
			/>
		</div>
	)
}

export default WriteRoomName
