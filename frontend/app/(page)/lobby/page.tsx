'use client'

import { useAuth } from '@/app/hooks/useAuth'
import WaitingRoomList from './component/WaitingRoomList'
import { useEffect } from 'react'
import UserInfo from '@/app/component/UserInfo'

const Lobby = () => {
	const { refetch } = useAuth()

	useEffect(() => {
		refetch()
	}, [])

	return (
		<>
			<UserInfo />
			<WaitingRoomList />
		</>
	)
}

export default Lobby
