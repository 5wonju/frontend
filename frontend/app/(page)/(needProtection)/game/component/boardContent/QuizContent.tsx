import { useEffect, useState } from 'react'
import { formatTime, QuizAnswer } from '../../lib/util'
import { useAnswerSelectStore, useQuizStore } from '../../lib/store'
import RoomInfo from './RoomInfo'

const QuizContent = () => {
  // TODO: 다음 문제 출제 api 완성되면 아래 주석 풀기
  // const { quiz } = useQuizStore()

  // 더미 퀴즈 데이터
  const quiz = {
    currentRound: 1,
    questionId: null,
    question: '우리팀의 막내 이름은?',
    options: ['이재민', '신창엽', '이우성', '이원주'],
    timeLimit: 10,
  }
  const [time, setTime] = useState(quiz.timeLimit) // 초기 시간: 10초
  const { selectAnswer } = useAnswerSelectStore()


  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 0.01
        } else {
          clearInterval(timer)
          return 0
        }
      })
    }, 10)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-5 select-none h-full">
      <RoomInfo quizNum={quiz.currentRound} />
      {/* 문제 정보 (문제 번호, 시간초) */}
      <div className="flex flex-col items-center pt-8">
        <p className="font-bold text-3xl">
          <span className="text-black">
            {time < 2 ? <span className="text-red-500">{formatTime(time)}</span> : formatTime(time)}
          </span>
        </p>
      </div>

      {/* 문제 */}
      <div className="flex gap-4 text-black text-xl">
        <p>{quiz.question}</p>
      </div>

      {/* 보기 */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-lg w-11/12">
        {/* quiz.options 의 각 요소가 A, B, C, D 인 OptionsEnum을 가짐 */}
        {quiz.options.map((answer, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 glass ${
              selectAnswer === QuizAnswer[index] ? 'bg-indigo-400 bg-opacity-40' : ''
            } text-black gap-1 w-full rounded-xl transition-colors border-2 backdrop-blur-md border-opacity-75 border-white px-4 py-2`}
          >
            <span className="font-medium bg-indigo-600 text-white rounded-full size-6 flex items-center justify-center">
              {QuizAnswer[index]}
            </span>
            <p>{answer}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizContent
