import { useEffect, useState } from 'react'
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

// 더미 데이터
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
  const [result, setResult] = useState({
    winTeam: false,
    0: false,
    1: false,
    2: false,
  })
  useEffect(() => {
    const keys = ['2', '1', '0', 'winTeam']
    keys.forEach((key, index) => {
      setTimeout(() => {
        setResult((prevState) => ({
          ...prevState,
          [key]: true,
        }))
      }, 500 * (index + 1))
    })

    return () =>
      keys.forEach((key, index) => {
        clearTimeout(500 * (index + 1))
      })
  }, [])

  return (
    <div className="min-h-full flex flex-col items-center py-4 animate-floating">
      {/* 우승팀 결과 or 기본 정보 */}
      <section
        className={`glass px-2 py-3 ${
          result.winTeam ? 'visible animate-fadeInLast duration-500' : 'invisible'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-3xl">
          <span className={`text-red-400`}>RED</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png"
            alt="Star"
            className=" size-6"
          />
          <span className="flex items-center gap-1 text-yellow-400">WIN</span>
        </div>
      </section>
      {/* 리스트 요소 하나씩 등장하기 */}
      <ul className="flex-1 flex flex-col gap-3 pt-5 justify-around">
        {wonUserList.map((wonUser, index) => (
          <li
            key={index}
            className={`${
              result[index as keyof typeof result] ? 'visible animate-fadeIn' : 'invisible'
            }
            glass flex gap-4 justify-around items-end px-3 py-2`}
          >
            <p className="font-semibold text-xl text-darkGray3">{rankList[wonUser.rank]}.</p>
            <p className="fle1 flex flex-col items-start">
              <span className="font-normal text-xs text-darkGray3 h-3">{wonUser.time}초</span>
              <span
                className={`${
                  teamColorToCss[wonUser.team]
                } font-medium text-xl overflow-hidden w-24 select-none truncate`}
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
