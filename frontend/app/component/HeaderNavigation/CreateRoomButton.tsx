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
      <button type="button" onClick={openCreateRoomModal} className="nav-btn">
        방 만들기
      </button>
      {isModalOpen &&
        createPortal(<CreateRoomModal onModalClose={closeCreateRoomModal} />, document.body)}
    </>
  )
}

export default CreateRoomButton
