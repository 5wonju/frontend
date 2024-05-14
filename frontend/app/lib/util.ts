import { IUserInfo, IUserScore } from '../(page)/(needProtection)/game/lib/type'

// gameUserList 에서 유저 정보로 score 객체 생성 함수
export const setUserScores = (userInfo: IUserInfo[]): IUserScore[] => {
  const userScores: IUserScore[] = []
  for (const user of userInfo) {
    userScores.push({
      nickname: user.userNickname,
      point: user.userScore,
    })
  }
  return userScores
}
