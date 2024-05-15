import { PiPersonArmsSpreadFill } from 'react-icons/pi'
import RoomInfo from './RoomInfo'
import { useEffect, useState } from 'react'

const TeamSelectContent = () => {
  return (
    <fieldset className="flex flex-col gap-4 pt-2 items-center justify-around text-black transition-colors">
      {/* TODO: 문구 의논해서 정하기 */}
      <h2 className="text-3xl font-medium">팀을 선택하세요</h2>
      <div className="text-md flex flex-col items-center gap-1">
        <p className="*:font-bold">
          <span className="text-red-500">RED</span> 혹은
          <span className="text-blue-500"> BLUE</span> 필드로 이동해 팀을 선택하세요
        </p>
        <p className="text-md text-center">
          우측 하단의
          <button className="bg-indigo-600 text-white font-semibold bg-gradient-to-bl from-indigo-400 to-indigo-600 border-4 border-lightGray4 rounded-full py-1.5 px-1.5 shadow-md mx-1">
            <PiPersonArmsSpreadFill className="size-4 m-auto text-center" />
          </button>
          버튼을 눌러 캐릭터를 변경해 보세요
        </p>
      </div>
    </fieldset>
  )
}

const GameRuleContent = () => {
  return (
    <fieldset className="flex flex-col gap-4 pt-2 items-center justify-around text-black transition-colors">
      <h2 className="text-3xl font-medium">매 라운드 퀴즈가 출제됩니다</h2>
      <div className="text-md flex flex-col items-center gap-2">
        <p className="flex">
          {['A', 'B', 'C', 'D'].map((answer) => (
            <span key={answer} className='pr-1'>
              <span
                key={answer}
                className="font-medium bg-indigo-600 text-white rounded-full size-6 flex items-center justify-center"
              >
                {answer}
              </span>
            </span>
          ))}
          중 정답이라고 생각되는 구역으로 이동해서 정답을 선택하세요
        </p>
        <p className="flex text-md items-center justify-center">
          정답을 가장 먼저 맞춘 3인에게 점수가 부여됩니다
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Clapping%20Hands%20Light%20Skin%20Tone.png"
            alt="Clapping Hands Light Skin Tone"
            width="25"
            height="25"
          />
        </p>
      </div>
    </fieldset>
  )
}

const IntroductionContent = () => {
  // TeamSelectContent, GameRuleContent가 각각 번갈아가면서 보여짐
  const [currentContent, setCurrentContent] = useState(0)
  const contents = [<TeamSelectContent key="team-select"/>, <GameRuleContent key="game-rule"/>]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContent((prev) => (prev + 1) % contents.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [contents.length])

  return (
    <div className="select-none flex flex-col justify-around h-full">
      <RoomInfo />
      {contents[currentContent]}
    </div>
  )
}

export default IntroductionContent
