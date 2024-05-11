import { ICreatedRoom, IWaitingRoom, ProblemCategoryType, gameMode } from './type'

export const CATEGORY_LIST: ProblemCategoryType[] = ['개발', '과학', '컴퓨터', '한국사', '근현대사']

// api 연결 전에 더미 방 리스트 데이터 생성
export const generateRooms = (): IWaitingRoom[] => {
  const rooms: IWaitingRoom[] = []
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
      probCategory: [(CATEGORY_LIST as ProblemCategoryType[])[Math.floor(Math.random() * 4)]],
      hasPassword: Math.random() > 0.5,
      curRound: Math.floor(Math.random() * 10),
      totalRound: 20,
      roomMode: ['BASIC', 'YOOT'][Math.floor(Math.random() * 2)] as 'BASIC' | 'YOOT',
    })
  }

  return rooms
}

// :: Type Guard
const isProblemCategoryType = (probCategory: string): probCategory is ProblemCategoryType => {
  return CATEGORY_LIST.includes(probCategory as ProblemCategoryType)
}
export const isWaitingRoomData = (room: any): room is ICreatedRoom => {
  return (
    typeof room.roomTitle === 'string' &&
    typeof room.roomPW === 'string' &&
    room.probCategory.every((selectedCategory: ProblemCategoryType) =>
      CATEGORY_LIST.includes(selectedCategory)
    ) &&
    typeof room.maxUserNum === 'number' &&
    (room.roomMode === 'BASIC' || room.roomMode === 'YOOT') &&
    typeof room.probNum === 'number'
  )
}

// :: Validate Created Room Data Functions
// - 입장 가능한 방인지 검사
export const canEnterRoom = (room: IWaitingRoom) => {
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
// - 생성 가능한 방인지 검사
export const validateCreateRoomData = ({
  roomTitle,
  roomPW,
  probCategory,
  maxUserNum,
  roomMode,
  probNum,
}: {
  roomTitle: string
  roomPW: string
  probCategory: ProblemCategoryType[]
  maxUserNum: number
  roomMode: gameMode
  probNum: number
}): boolean => {
  if (!roomTitle || !probCategory || !maxUserNum || !roomMode || !probNum) {
    alert('비밀번호를 제외한 모든 항목을 입력해주세요.')
    return false
  }

  if (roomTitle.length > 10) {
    alert('방 제목은 10자 이내로 작성해야 합니다.')
    return false
  }

  if (roomPW.length > 0 && roomPW.length < 4) {
    alert('비밀번호 작성 시 4자 이상으로 작성해야 합니다.')
    return false
  }

  if (
    !probCategory.every((selectedCategory) =>
      CATEGORY_LIST.includes(selectedCategory as ProblemCategoryType)
    )
  ) {
    alert('유효하지 않은 카테고리 정보입니다.')
    return false
  }

  if (maxUserNum < 2 || maxUserNum > 10) {
    alert('플레이어 수는 2명 이상 10명 이하여야 합니다.')
    return false
  }

  if (roomMode !== 'BASIC' && roomMode !== 'YOOT') {
    alert('유효하지 않은 게임 모드 정보입니다.')
    return false
  }

  if (probNum < 10 || probNum > 100) {
    alert('문제 수는 10개 이상 100개 이하여야 합니다.')
    return false
  }

  return true
}
