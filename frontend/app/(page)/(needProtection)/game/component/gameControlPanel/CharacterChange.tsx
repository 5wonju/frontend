import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './Carousel'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'
import {
  useCharacterSelectStore,
  useModalStore,
} from '@/app/(page)/(needProtection)/game/lib/store'
import { PiPersonArmsSpreadFill } from 'react-icons/pi'

const CharacterChange = ({ numItems = 6, radius = 2 }) => {
  const { setModalOpen } = useModalStore((state) => ({
    setModalOpen: state.setModalOpen,
  }))

  const { characterIndex, setCharacterIndex } = useCharacterSelectStore((state) => ({
    characterIndex: state.characterIndex,
    setCharacterIndex: state.setCharacterIndex,
  }))
  const [character, setCharacter] = useState(characterIndex)

  const [rotation, setRotation] = useState(4.7) // 0.54
  const step = (Math.PI * 2) / numItems

  const handleOpenModal = () => {
    const element = document.getElementById('character-select-modal')
    if (element) {
      element.classList.remove('hidden')
    }
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    const element = document.getElementById('character-select-modal')
    if (element) {
      element.classList.add('hidden')
    }
    setModalOpen(false)
  }

  const handleSelectCharacter = () => {
    handleCloseModal()
    setCharacterIndex(character)
  }

  const rotateCarousel = (direction: number) => {
    setRotation((prev) => prev + step * direction)
    let index = character
    if (direction > 0) {
      index = (index + 1) % numItems
    }
    if (direction < 0) {
      index = (index - 1) % numItems
    }

    index = index < 0 ? index + 6 : index
    setCharacter(index)
  }

  return (
    <>
      <button onClick={handleOpenModal} className="character-change-btn inline rounded-full py-3 px-3 shadow-md">
        <PiPersonArmsSpreadFill className='size-8 m-auto text-center'/>
      </button>

      <div
        id="character-select-modal"
        className="hidden bg-white flex flex-col justify-center items-center bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg border border-white border-opacity-60 fixed inset-14 rounded-3xl"
      >
        <div className="absolute top-16 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">캐릭터 변경</h1>
          <h1 className="text-md text-black">플레이할 캐릭터를 선택해 주세요</h1>
        </div>
        <Canvas className="absolute inset-0">
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          <Carousel rotation={rotation} />
        </Canvas>
        <button onClick={() => rotateCarousel(1)} className="absolute -left-4">
          <FaCircleChevronLeft className="size-12 text-indigo-600 hover:text-indigo-500 transition-colors" />
        </button>
        <button onClick={() => rotateCarousel(-1)} className="absolute -right-4">
          <FaCircleChevronRight className="size-12 text-indigo-600 hover:text-indigo-500 transition-colors" />
        </button>
        <button
          onClick={handleSelectCharacter}
          className="absolute bottom-24 text-center text-xl px-4 indigo-btn-active"
        >
          선택하기
        </button>
      </div>
    </>
  )
}

export default CharacterChange
