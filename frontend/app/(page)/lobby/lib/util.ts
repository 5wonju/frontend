export const generateRooms = (): WaitingRoom[] => {
	const rooms: WaitingRoom[] = []
	for (let i = 1; i <= 100; i++) {
		const roomMaxUserNum = 10
		const roomCurUserNum = Math.floor(Math.random() * roomMaxUserNum) + 1

		rooms.push({
			roomId: i,
			roomTitle: `방 제목 ${i}`,
			roomOwnerName: `방장${i}`,
			roomCurUserNum: roomCurUserNum,
			roomMaxUserNum: 10,
			isGameStart: Math.random() > 0.5,
			isRoomFull: roomCurUserNum === roomMaxUserNum,
			probCategory: ['수학 퀴즈', '일반상식', '역사', '코딩'][Math.floor(Math.random() * 4)],
			isHavePW: Math.random() > 0.5,
			curRound: Math.floor(Math.random() * 10),
			totalRound: 20,
			roomMode: ['basic', 'yutnori'][Math.floor(Math.random() * 2)] as 'basic' | 'yutnori',
		})
	}

	return rooms
}

export const canEnterRoom = (room: WaitingRoom) => {
	const isRoomFull = room.roomCurUserNum === room.roomMaxUserNum
	const isGameStart = room.isGameStart

	if (isRoomFull) {
		alert('방이 가득 찼습니다.')
		return false
	}
	if (isGameStart) {
		alert('게임이 시작된 방입니다.')
		return false
	}

	return true
}
