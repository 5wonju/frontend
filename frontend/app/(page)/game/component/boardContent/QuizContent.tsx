import { useEffect, useState } from 'react'

const QuizAnswerList = [
  {
    answer: 'A',
    content: '신라',
  },
  {
    answer: 'B',
    content: '고구려',
  },
  {
    answer: 'C',
    content: '백제',
  },
  {
    answer: 'D',
    content: '조선',
  },
]

const formatTime = (time: number) => {
  const seconds = time.toFixed(2) // 소수점 2자리까지 표시
  return seconds
}

const QuizContent = () => {
  const question = '다음 중 삼국시대에 해당하지 않는 국가는?'
  const [time, setTime] = useState(10) // 초기 시간: 10초

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 0.01 // 1초가 아닌 0.01초로 수정
        } else {
          clearInterval(timer) // 타이머 중지
          return 0
        }
      })
    }, 10)

    return () => clearInterval(timer) // 컴포넌트가 언마운트될 때 타이머 중지
  }, [])

  return (
    <div className="flex flex-col items-center gap-5 select-none h-full">
      {/* 문제 정보 (문제 번호, 시간초) */}
      <div className="flex flex-col items-center">
        <h1 className="text-darkGray3">Quiz.1</h1>
        <p className="font-bold text-3xl">
          <span className="text-black">
            {time < 2 ? <span className="text-red-500">{formatTime(time)}</span> : formatTime(time)}
          </span>
        </p>
      </div>

      {/* 문제 */}
      <div className="flex gap-4 text-black text-xl">
        <p>{question}</p>
      </div>

      {/* 보기 */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-lg w-11/12">
        {QuizAnswerList.map((answer, index) => (
          <li
            key={index}
            className="flex glass text-black gap-1 w-full rounded-xl border-2 backdrop-blur-md border-opacity-75 border-white px-4 py-2"
          >
            <span className="font-medium bg-indigo-600 text-white rounded-full size-6 flex items-center justify-center">{answer.answer}</span>
            <p>{answer.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizContent
