import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { handleLogout, verifyToken } from '../lib/api'
import { useRouter } from 'next/navigation'
import { handleLogin } from '../(page)/login/(page)/callback/lib/api'

interface IUserData {
  nickname: string
  point: number
  winRate: number
  exp: number
  escapeHistory: number
  winCnt: number
}

export const useAuth = () => {
  const queryClient = useQueryClient()

  // 사용자 인증 상태 확인
  const {
    data: authData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['authStatus'],
    queryFn: verifyToken,
    staleTime: Infinity,
    select: (data) => data ?? { isValid: false }, // 데이터가 없으면 isValid를 false로 설정
  })

  useEffect(() => {
    if (isError) {
      queryClient.setQueryData(['authStatus'], { isValid: false })
    }
  }, [isError, queryClient])

  const router = useRouter()

  // 로그인
  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      // 로그인 성공 후 처리, 예: `isValid`를 `true`로 설정
      queryClient.setQueryData(['authStatus'], { isValid: true, ...data })
      router.push('/channel')
    },
    onError: (error) => {
      // 로그인 실패 처리
      console.error('Login failed:', error)
      router.push('/login')
    },
  })

  // 로그아웃 처리
  const logout = async () => {
    try {
      await handleLogout()
      queryClient.setQueryData(['authStatus'], { isValid: false })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    isLoggedIn: !!authData?.nickname,
    userInfo: authData?.nickname ? authData : null, // 로그인 상태면 사용자 정보 반환, 아니면 null
    isLoading,
    login: (code: string, state: string) => loginMutation.mutate({ code, state }),
    logout,
    refetch: refetch,
  }
}
