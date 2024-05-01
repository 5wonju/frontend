'use client'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'
// import PreviewImage from './component/HomeUI/PreviewImage'
import AutoInstruction from './component/HomeUI/AutoInstruction'

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
		<main className="flex h-[calc(100%-3.5rem)] items-center justify-between m-10 px-10">
			<fieldset className="flex flex-col gap-16">
				<AutoInstruction />
				<button
					className="bg-indigo-600 text-neutral-100 font-semibold text-xl py-6 w-44 rounded-full hover:bg-indigo-500 transition-colors"
					onClick={handleGameStart}
				>
					시작하기
				</button>
			</fieldset>

			<fieldset className="h-full">
				{/* <PreviewImage /> */}
			</fieldset>
		</main>
	)
}
