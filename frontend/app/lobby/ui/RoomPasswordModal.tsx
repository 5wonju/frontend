'use client'
// components/PasswordModal.tsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface PasswordModalProps {
	isOpen: boolean
	onClose: (event: React.MouseEvent<HTMLButtonElement>) => void
	submitPassword: (password: string) => void
}

const RoomPasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, submitPassword }) => {
	const [password, setPassword] = useState<string>('')
	const handleSubmitPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		submitPassword(password)
	}

	if (!isOpen) return null

	const modalContent = (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
				<h2 className="text-xl font-semibold mb-4">Enter Room Password</h2>
				<input
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="border border-gray-300 p-2 w-full rounded-md mb-4 text-black"
				/>
				<button
					onClick={handleSubmitPassword}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
				>
					Submit
				</button>
				<button
					onClick={onClose}
					className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
				>
					Close
				</button>
			</div>
		</div>
	)

	return ReactDOM.createPortal(modalContent, document.getElementById('root') as HTMLElement)
}

export default RoomPasswordModal
