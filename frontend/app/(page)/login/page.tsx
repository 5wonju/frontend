'use client'

import React from 'react'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchState } from './lib/api'

const GOOGLE_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize'
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const RESPONSE_TYPE = 'code'
const SCOPE = 'profile_nickname profile_image account_email'

function Login() {
	const handleLogin = async () => {
		try {
			const response = await fetchState()
			const state = response.state
			const REDIRECT_URI = `${window.location.href}/callback`
			window.location.href = `${GOOGLE_AUTH_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<h1>Login with 카ㅏㅏㅏㅏ카오</h1>
			<button onClick={handleLogin}>Sign in with KaKAo</button>
		</div>
	)
}
export default Login
