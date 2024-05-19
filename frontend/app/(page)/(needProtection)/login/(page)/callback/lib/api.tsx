import { tokenInstance } from '@/app/axios'

export const handleLogin = async ({ code, state }: { code: string; state: string }) => {
  try {
    console.log({ code: code, state: state })
    const response = await tokenInstance.post('/users/oauth/kakao/distribution-to-distribution', {
      code: code,
      state: state,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
