import { instance } from '@/app/axios'

export const fetchState = async (): Promise<IState> => {
  try {
    const response = await instance.post('/users/oauth/state')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
