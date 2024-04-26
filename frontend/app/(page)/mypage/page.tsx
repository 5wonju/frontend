'use client'
import React, { useEffect } from 'react'
import UserInfo from '../../component/UserInfo'
import { useAuth } from '@/app/hooks/useAuth'

const Mypage = () => {
	const { refetch } = useAuth()

	useEffect(() => {
		refetch()
	}, [])

	return (
		<div>
			<UserInfo />
		</div>
	)
}

export default Mypage
