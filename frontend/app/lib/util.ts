import { IUserInfo, UserScoreType } from '../(page)/(needProtection)/game/lib/type'

// gameUserList 에서 유저 정보로 score 객체 생성 함수
export const setUserScores = (userInfo: IUserInfo[]): UserScoreType[] => {
  const userScores: UserScoreType[] = []
  for (const user of userInfo) {
    userScores.push({ [user.userNickname]: 0 })
  }
  return userScores
}
