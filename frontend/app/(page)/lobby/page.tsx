'use client'

import { useAuth } from '@/app/hooks/useAuth'
import WaitingRoomList from './component/WaitingRoomList'
import { useEffect } from 'react'

const Lobby = () => {
	const { userInfo, refetch } = useAuth()

	useEffect(() => {
		refetch()
	}, [])
	useEffect(() => {
		console.log(userInfo)
	}, [userInfo])

	return <WaitingRoomList />
}

export default Lobby
