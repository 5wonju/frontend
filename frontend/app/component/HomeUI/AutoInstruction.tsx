'use client'

import { useEffect, useState } from 'react'

interface IInstruction {
  title: string
  description: string
}

// TODO: AI스러운 문구는 추후 수정하기
const descriptions: IInstruction[] = [
  {
    title: '스피드 퀴즈 챌린지',
    description:
      '누가 가장 빠르고 똑똑한지 경쟁하는 3D 퀴즈 게임! 역사, 개발, 상식 문제를 해결하고, 장애물을 피하면서 팀의 승리를 이끌어보세요.',
  },
  {
    title: '팀 퀴즈 대항전',
    description:
      '당신의 지식을 시험할 수 있는 기회! 장애물을 넘어서며 팀원과 함께 다양한 주제의 퀴즈를 해결하고, 가장 많은 정답을 맞춘 팀이 승리합니다.',
  },
  {
    title: '3D로 즐기는 퀴즈',
    description:
      '개발, 상식, 역사 등 다양한 주제로 펼쳐지는 3D 퀴즈 게임에서 경쟁하세요. 장애물을 피하고, 빠르게 정답을 맞춰 승리의 팀이 되어 보세요!',
  },
]

const AutoInstruction = () => {
  const [currentDescIndex, setCurrentDescIndex] = useState(0)
  const interval = 4000

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 다음 이미지의 인덱스를 계산하여 설정
      setCurrentDescIndex((prevIndex) =>
        prevIndex === descriptions.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    // 컴포넌트가 언마운트될 때 인터벌 클리어
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      {descriptions.map(
        (item, index) =>
          // 현재 나타낼 문구만 마운트
          index === currentDescIndex && (
            <div key={index} className="flex flex-col gap-5">
              <h2
                className={`text-6xl text-neutral-800 font-black ${
                  // 현재 나타날 문구일 경우에만 애니메이션 클래스 추가
                  index === currentDescIndex ? 'animate-faceInFromButtom1' : ''
                }`}
              >
                {descriptions[currentDescIndex].title}
              </h2>
              <p
                className={`w-3/5 text-neutral-600 leading-8 ${
                  index === currentDescIndex ? 'animate-faceInFromButtom2' : ''
                }`}
              >
                {descriptions[currentDescIndex].description}
              </p>
            </div>
          )
      )}
    </>
  )
}

export default AutoInstruction
