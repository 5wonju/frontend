import { teamEnum } from '../../lib/store'
import { teamColorToCss } from './TeamInfo'

interface IWonUser {
  nickname: string
  team: teamEnum
  userId: number
  rank: number
  time: number
}

const rankList: { [key: number]: string } = {
  1: '1st',
  2: '2nd',
  3: '3rd',
}

const wonUserList: IWonUser[] = [
  {
    nickname: 'user1s-3we',
    team: teamEnum.RED,
    userId: 1,
    rank: 1,
    time: 2.012,
  },
  {
    nickname: 'wnatdsoi',
    team: teamEnum.BLUE,
    userId: 2,
    rank: 2,
    time: 2.012,
  },
  {
    nickname: 'woosss',
    team: teamEnum.RED,
    userId: 3,
    rank: 3,
    time: 2.012,
  },
]

const QuizResult = () => {
  const quizNumber = 1
  return (
    <div className="board flex flex-col items-center p-4">
      <h1 className="text-lg text-lightGray1 font-semibold pb-2">Quiz. {quizNumber}</h1>
      <section className="flex items-center gap-2 font-bold text-3xl animate-floating">
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
          <li key={index} className="flex gap-4 justify-between items-end px-2">
            <p className="font-bold text-2xl text-darkGray3">{rankList[wonUser.rank]}.</p>
            <p className="fle1 flex flex-col items-start">
              <span className="font-light text-sm text-lightGray1">{wonUser.time}초</span>
              <span
                className={`${
                  teamColorToCss[wonUser.team]
                } font-semibold text-2xl overflow-hidden w-24 select-none truncate`}
              >
                {wonUser.nickname}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizResult
