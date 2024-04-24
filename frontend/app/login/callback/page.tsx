'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import { useAuth } from '@/app/lib/hooks/useAuth'

const LoginCallbackPage = () => {
	const router = useRouter()
	const params = useSearchParams()

	const { login } = useAuth()
	useEffect(() => {
		try {
			if (params && params.get('state') && params.get('code')) {
				login(params.get('code')!, params.get('state')!)
			}
		} catch (e) {
			console.error(e)
		} finally {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div>Logging in...</div>
		</Suspense>
	)
}

export default LoginCallbackPage
