import { tokenInstance } from '@/app/axios'
import { QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'

export const getSocketToken = async () => {
  try {
    const response = await tokenInstance.post('/users/generate/socket-token')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const connectServerSocket = async (region: string, socketToken: string) => {
  const ws = new WebSocket(`wss://yourdomain.com/ws/${region}`, [socketToken])
  return ws
}

export const getChannelData = async (accessToken?: string): Promise<IChannelData[]> => {
  try {
    // if (accessToken === undefined) throw new Error('accessToken is undefined')

    const response = await axios.get('http://localhost:3000/api/channel', {
      withCredentials: true,
    })
    console.log(response)

    return response.data // axios의 응답 데이터는 data 속성에 저장됩니다.
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getChannelDataWithNextJS = async ({
  queryKey,
}: QueryFunctionContext): Promise<IChannelData[]> => {
  try {
    const accessToken = queryKey[1]
    if (accessToken === undefined) throw new Error('accessToken is undefined')

    const response = await fetch('http://localhost:3000/api/channel', {
      next: {
        tags: ['channel'], // next에서 관리하는 캐시의 키(reactQuery의 queryKey와 동일한 역할을 하지만 둘이 같은 공간을 공유하지는 않음)
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    // revalidatePath('/api/channel') // 페이지와 관련된 모든 캐시를 갱신합니다.(이 api가 아니더라도 같은 경로에 있는 다른 api도 캐시가 갱신됩니다.)
    // revalidateTag('channel') // 관련된 태그의 캐시만 갱신합니다.

    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
