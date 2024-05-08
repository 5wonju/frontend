import { tokenInstance } from '../axios'

// api api 관련 함수를 관리하는 파일
export const getSocketToken = async (): Promise<string> => {
  try {
    const response = await tokenInstance.post('/users/generate/socket-token')
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const verifyToken = async () => {
  try {
    const response = await tokenInstance.get('/users/my-page')
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const handleLogout = async () => {
  try {
    await tokenInstance.get('/api/logout')
  } catch (error) {
    console.error(error)
    throw error
  }
}
