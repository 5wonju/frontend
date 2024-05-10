/*
  <게임 시작 버튼 활성화 조건>
  - 모든 플레이어가 준비 상태일 때
  - 방장도 팀을 선택했을 때
*/
const StartButton = () => {
  // const readyStatus = false
  const readyStatus = true

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
