// export const roomsDummyData: Room[] = [
// 	{
// 		roomId: 1,
// 		roomTitle: '초고수의 도전',
// 		roomOwnerName: 'GameMaster',
// 		roomCurUserNum: 4,
// 		roomMaxUserNum: 10,
// 		isGameStart: false,
// 		isRoomFull: false,
// 		probCategory: '수학 퀴즈',
// 		isHavePW: false,
// 		curRound: 0,
// 		totalRound: 20,
// 		roomMode: 'basic',
// 	},
// 	{
// 		roomId: 2,
// 		roomTitle: '초보자만 오세요',
// 		roomOwnerName: 'Newbie',
// 		roomCurUserNum: 10,
// 		roomMaxUserNum: 10,
// 		isGameStart: true,
// 		isRoomFull: true,
// 		probCategory: '일반상식',
// 		isHavePW: true,
// 		curRound: 3,
// 		totalRound: 15,
// 		roomMode: 'basic',
// 	},
// 	{
// 		roomId: 3,
// 		roomTitle: '윷놀이 챌린지',
// 		roomOwnerName: 'YutMaster',
// 		roomCurUserNum: 6,
// 		roomMaxUserNum: 8,
// 		isGameStart: false,
// 		isRoomFull: false,
// 		probCategory: '한국사',
// 		isHavePW: false,
// 		curRound: 0,
// 		totalRound: 30,
// 		roomMode: 'yutnori',
// 	},
// 	{
// 		roomId: 4,
// 		roomTitle: '파이썬 프로그래밍',
// 		roomOwnerName: 'Coder',
// 		roomCurUserNum: 8,
// 		roomMaxUserNum: 8,
// 		isGameStart: true,
// 		isRoomFull: true,
// 		probCategory: '코딩',
// 		isHavePW: true,
// 		curRound: 5,
// 		totalRound: 10,
// 		roomMode: 'basic',
// 	},
// ]

export const generateRooms = (): Room[] => {
	const rooms: Room[] = []
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
