'use client'

import CreateRoomModal from '@/app/(page)/lobby/component/CreateRoom/CreateRoomModal'
import { useState } from 'react'
import { createPortal } from 'react-dom'

const CreateRoomButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openCreateRoomModal = () => {
		setIsModalOpen(true)
	}

	const closeCreateRoomModal = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<button
				type="button"
				onClick={openCreateRoomModal}
				className="font-bold rounded-lg border-2 border-black text-black px-2 py-1"
			>
				방 만들기
			</button>
			{isModalOpen &&
				createPortal(
					<CreateRoomModal onModalClose={closeCreateRoomModal} />,
					document.body
				)}
		</>
	)
}

export default CreateRoomButton