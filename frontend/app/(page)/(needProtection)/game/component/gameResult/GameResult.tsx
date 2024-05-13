import { useGameResultStore, useGameRoomStore } from '../../lib/store'
import { gameStateEnum, teamEnum } from '../../lib/store-type'
import { IGameResult } from '../../lib/type'
import TeamResult from './TeamResult'

const GameResult = () => {
  const { gameState } = useGameRoomStore((state) => ({
    gameState: state.gameState,
  }))
  // const { gameResult } = useGameResultStore()
  // 더미 데이터
  const gameResult: IGameResult = {
    winTeam: 'RED',
    redTeamTotalPoint: 151000,
    blueTeamTotalPoint: 121200,
    redTeam: [
      {
        userId: 1,
        username: 'red1',
        earnPoint: 10,
        amIMe: true,
      },
      {
        userId: 2,
        username: 'red2',
        earnPoint: 20,
        amIMe: false,
      },
      {
        userId: 3,
        username: 'red3',
        earnPoint: 30,
        amIMe: false,
      },
    ],
    blueTeam: [
      {
        userId: 4,
        username: 'blue1',
        earnPoint: 40,
        amIMe: false,
      },
      {
        userId: 5,
        username: 'blue2',
        earnPoint: 50,
        amIMe: false,
      },
      {
        userId: 6,
        username: 'blue3',
        earnPoint: 60,
        amIMe: false,
      },
    ],
  }

  return (
    <div
      className={`${
        gameState === gameStateEnum.DONE ? 'visible' : 'hidden'
      } fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-20 flex items-center justify-center`}
    >
      <div className="bg-white z-30 inset-32 flex flex-col gap-10 justify-center items-center bg-opacity-60 backdrop-filter backdrop-blur-md shadow-lg border border-white border-opacity-60 fixed rounded-3xl p-4">
        <div className="flex items-center gap-2 font-bold text-7xl animate-floating">
          <span className={`text-red-400`}>{gameResult.winTeam}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png"
            alt="Star"
            className=" size-6"
          />
          <span className="flex items-center gap-1 text-yellow-400">WIN</span>
        </div>

        <fieldset className="flex justify-around w-full *:w-5/12 items-center mt-4">
          <section>
            <TeamResult
              team={teamEnum.RED}
              isWin={gameResult.winTeam === teamEnum.RED}
              teamPoint={gameResult.redTeamTotalPoint}
              teamResult={gameResult.redTeam}
            />
          </section>
          <section>
            <TeamResult
              team={teamEnum.BLUE}
              isWin={gameResult.winTeam === teamEnum.BLUE}
              teamPoint={gameResult.blueTeamTotalPoint}
              teamResult={gameResult.blueTeam}
            />
          </section>
        </fieldset>
      </div>
    </div>
  )
}

export default GameResult
