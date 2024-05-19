import { useGameRoomStore } from '../../lib/store'
import { teamEnum } from '../../lib/store-type'

/*
  <게임 시작 버튼 활성화 조건>
  - 모든 플레이어가 준비 상태일 때
*/
const StartButton = () => {
  const { gameUserList } = useGameRoomStore((state) => ({
    gameUserList: state.gameUserList,
  }))
  let readyStatus = false

  if (gameUserList) {
    // 유저의 team이 blue와 red인 유저가 각각 gameUserList의 길이의 반만큼 존재할 때
    const blueTeam = gameUserList.filter((user) => user.team === teamEnum.BLUE).length
    const redTeam = gameUserList.filter((user) => user.team ===  teamEnum.RED).length
    if (blueTeam === gameUserList.length / 2 && redTeam === gameUserList.length / 2) {
      readyStatus = true
    }
  }

  const handleGameStart = () => {
    console.log('game start')
  }
  return (
    <button
      onClick={handleGameStart}
      className={`bg-gradient-to-bl uppercase transition-colors border-8 font-bold text-4xl py-4 px-10 rounded-full shadow-md ${
        readyStatus
          ? 'from-lime-300 to-green-500 text-lightGray5'
          : 'from-lightGray2 to-lightGray1 text-darkGray3'
      }`}
    >
      start
    </button>
  )
}

export default StartButton
