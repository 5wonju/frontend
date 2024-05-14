import { AnswerEnum, teamEnum } from './store-type'

// 정답자 순위 표현
export const rankList: { [key: number]: string } = {
  1: '1st',
  2: '2nd',
  3: '3rd',
}

// 팀 색상 text css
export const teamColorToCssText = {
  [teamEnum.RED]: 'text-red-400',
  [teamEnum.BLUE]: 'text-blue-400',
  [teamEnum.NONE]: 'text-gray-400',
}

// 팀 색상 bg css
export const teamColorToCssBg = {
  [teamEnum.RED]: 'bg-red-400',
  [teamEnum.BLUE]: 'bg-blue-400',
  [teamEnum.NONE]: 'bg-gray-400',
}

// 캐러셀 위치 계산 함수
export const getPosition = (index: number, numItems = 6, radius: number) => {
  const angle = (index / numItems) * Math.PI * 2
  const x = Math.cos(angle) * radius
  const y = 0
  const z = Math.sin(angle) * radius
  return [x, y, z]
}

// 캐릭터 모델 경로 리스트
export const models = [
  '/models/character-select/custom-model0.gltf',
  '/models/character-select/custom-model1.gltf',
  '/models/character-select/custom-model2.gltf',
  '/models/character-select/custom-model3.gltf',
  '/models/character-select/custom-model4.gltf',
  '/models/character-select/custom-model5.gltf',
]

// 시간 포맷 함수
export const formatTime = (time: number) => {
  const seconds = time.toFixed(2) // 소수점 2자리까지 표시
  return seconds
}

// 정답 선택 번호
export const QuizAnswer: { [key: number]: AnswerEnum } = {
  0: AnswerEnum.A,
  1: AnswerEnum.B,
  2: AnswerEnum.C,
  3: AnswerEnum.D,
}
