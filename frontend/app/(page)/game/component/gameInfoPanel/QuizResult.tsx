import { teamEnum } from '../../lib/store'
import { teamColorToCss } from './TeamInfo'

interface IWonUser {
  nickname: string
  team: teamEnum
  userId: number
  rank: number
  time: number
}

const wonUserList: IWonUser[] = [
  {
    nickname: 'user1',
    team: teamEnum.RED,
    userId: 1,
    rank: 1,
    time: 2.012,
  },
  {
    nickname: 'user2',
    team: teamEnum.BLUE,
    userId: 2,
    rank: 2,
    time: 2.012,
  },
  {
    nickname: 'user3',
    team: teamEnum.RED,
    userId: 3,
    rank: 3,
    time: 2.012,
  },
]

const QuizResult = () => {
  return (
    <div className="board flex flex-col items-center p-4">
      <h1 className="text-lg text-lightGray1 font-semibold pb-2">결과</h1>
      <section className="flex items-center gap-2 font-bold text-xl animate-floating">
        <span className={`text-red-400`}>RED</span>
        <span className="flex items-center gap-1 text-yellow-400">
          WIN
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png"
            alt="Star"
            className="size-10"
          />
        </span>
      </section>
      <ul className="flex-1 flex flex-col justify-around">
        {wonUserList.map((wonUser, index) => (
          <li key={index} className="flex gap-2 items-center">
            <p className="font-bold text-lg text-darkGray3">{wonUser.rank}st.</p>
            <span className={`${teamColorToCss[wonUser.team]} font-semibold`}>
              {wonUser.nickname}
            </span>
            <p className="font-light text-sm text-lightGray1">{wonUser.time}초</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizResult
