'use client'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'
import PreviewImage from './component/HomeUI/PreviewImage'
import AutoInstruction from './component/HomeUI/AutoInstruction'
import HeaderNavigationBar from './component/Navigation/HeaderNavigationBar'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const handleGameStart = () => {
    if (isLoggedIn) {
      router.push('/channel')
    } else {
      router.push('/login')
    }
  }
  return (
    <>
      <HeaderNavigationBar />
      <main className="flex h-[calc(100%-3rem)] items-center justify-between px-10 pt-12">
        <fieldset className="flex flex-col gap-16 w-1/2">
          <AutoInstruction />
          <button
            className="bg-indigo-600 border-4 font-semibold border-indigo-600 hover:border-4 hover:text-indigo-600 hover:border-indigo-600 text-neutral-100 hover:font-bold text-xl py-6 w-44 rounded-full hover:bg-white transition-colors select-none"
            onClick={handleGameStart}
          >
            시작하기
          </button>
        </fieldset>

        <fieldset className="h-[90%] my-auto w-1/2">
          <PreviewImage />
        </fieldset>
      </main>
    </>
  )
}
