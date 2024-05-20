'use client'

import React from 'react'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchState } from './lib/api'
import { useAuth } from '@/app/hooks/useAuth'
import Image from 'next/image'

// const GOOGLE_AUTH_URL = 'https://mo-or-do.net/users/oauth/kakao/distribution-to-distribution'
const GOOGLE_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize'
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const RESPONSE_TYPE = 'code'
const SCOPE = 'profile_nickname profile_image account_email'

function Login() {
  const { isLoggedIn, isLoading, refetch } = useAuth()
  const router = useRouter()

  useEffect(() => {
    refetch()
    console.log(isLoading, isLoggedIn)
    if (!isLoading && isLoggedIn) {
      router.push('/channel')
    }
  }, [isLoading, isLoggedIn])

  const handleLogin = async () => {
    try {
      const response = await fetchState()
      const state = response.data
      console.log('state:', state)
      const REDIRECT_URI = `${window.location.href}/callback`
      window.location.href = `${GOOGLE_AUTH_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading || isLoggedIn) {
    return <div>Loading...</div>
  }

  return (
    // <section className="flex flex-col justify-center items-center h-screen px-5">
    //   <h1 className="sr-only">로그인 페이지</h1>
    //   <div className="flex flex-col max-w-96 h-48">
    //     <p className="text-3xl">로그인</p>
    //     <p className="text-base pb-5 text-darkGray1">
    //       모 아니면 도에 오신 것을 환영합니다! 카카오로 로그인하여 시작하세요.
    //     </p>
    // <button
    //   onClick={handleLogin}
    //   className="text-large flex justify-center items-center gap-4 font-bold text-black rounded bg-yellow py-4"
    // >
    //   <Image src="/kakaoButton.svg" alt="카카오 로그인" width={19} height={18} />
    //   카카오 로그인
    // </button>
    //   </div>
    // </section>
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-5">
      <h1 className="sr-only">로그인 페이지</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <p className="text-4xl font-bold text-center text-gray-800 mb-4">로그인</p>
        <p className="text-base pb-8 text-center text-gray-600 font-medium">
          모 아니면 도에 오신 것을 환영합니다!
          <br />
          카카오로 로그인하여 시작하세요.
        </p>
        <button
          onClick={handleLogin}
          className="w-full text-large flex justify-center items-center gap-4 font-bold text-black rounded bg-yellow py-4"
        >
          <Image src="/kakaoButton.svg" alt="카카오 로그인" width={19} height={18} />
          카카오 로그인
        </button>
      </div>
    </section>
  )
}
export default Login
