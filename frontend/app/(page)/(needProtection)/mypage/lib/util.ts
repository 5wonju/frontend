import { NameMessageType } from './type.d'

export const validateNickname = (nickname: string): NameMessageType => {
  // :: 정규식
  const tooLongPwReg = /^.{10,}$/ // 10자 이상
  const validCharReg = /^[a-z0-9_.ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/g // 공백이나 유효하지 않은 문자가 포함된 경우

  // :: name 유효성 검사
  if (nickname.length === 0) {
    return 'empty'
  }
  if (tooLongPwReg.test(nickname)) {
    return 'tooLong'
  } else if (!validCharReg.test(nickname)) {
    return 'invalidChar'
  }
  return 'valid'
}
