import { tokenInstance } from '@/app/axios'
import { AxiosError } from 'axios'

interface IPatchNicknameRes {
  msg: string
  data: { nickname: string }
}

export const patchNickname = async (nickname: string): Promise<'valid' | 'duplicated'> => {
  try {
    await tokenInstance.patch('/users/my-page/nickname', { nickname })
    return 'valid'
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error)
      return error.response?.status === 409 ? 'duplicated' : 'valid'
    } else {
      console.error(error)
      throw error // 예기치 않은 오류는 다시 던집니다.
    }
  }
}
