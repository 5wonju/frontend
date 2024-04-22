import { postEnterRoom } from '../api'

const canEnterRoom = (room: Room) => {
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

export const enterRoom = async (room: Room, password: string | undefined) => {
	if (!canEnterRoom(room)) {
		return false
	}
	// 성공하면 방정보 저장 및 소켓 연결, 실패하면 alert
	const enterRoomRes = await postEnterRoom(room.roomId, password)
	const onGameUserList = enterRoomRes.data

	return true
}
