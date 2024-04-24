interface Room {
	roomTitle: string
	roomOwnerName: string
	roomCurUserNum: number
	roomMaxUserNum: number
	roomId: number
	isGameStart: boolean
	isRoomFull: boolean
	probCategory: string
	isHavePW: boolean
	curRound: number
	totalRound: number
	roomMode: 'basic' | 'yutnori'
}

interface RoomListResponse {
	msg: string
	data: {
		roomList: Room[]
	}
}
