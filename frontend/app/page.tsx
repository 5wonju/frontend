'use client'
import Image from 'next/image'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'

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
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<button className="w-96 h-40 bg-blue-500 rounded-lg" onClick={handleGameStart}>
				게임 시작
			</button>
		</main>
	)
}
