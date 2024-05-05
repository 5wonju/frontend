import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './Carousel'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useModalStore } from '../../lib/store';

const CharacterChange = ({ numItems = 6, radius = 2 }) => {
  const { isModalOpen, setModalOpen } = useModalStore((state) => ({
		isModalOpen: state.isModalOpen,
    setModalOpen: state.setModalOpen,
	}))
	const [rotation, setRotation] = useState(0.6)
	console.log(rotation)
	const step = (Math.PI * 2) / numItems

	const handleOpenModal = () => {
		console.log('캐릭터 변경 모달 열기')
		const element = document.getElementById('character-select-modal')
		if (element) {
			element.classList.remove('hidden')
		}
    setModalOpen(true)
	}

	const rotateCarousel = (direction: number) => {
		setRotation((prev) => prev + step * direction)
	}

	return (
		<>
			<button
				onClick={handleOpenModal}
				className="bg-indigo-600 text-white rounded-full px-2.5 py-1 transition-colors font-semibold hover:bg-transparent hover:ring-[2.5px] hover:ring-indigo-600 ring-inset hover:text-indigo-600 hover:filter hover:bg-blur"
			>
				캐릭터 변경
			</button>

			<div
				id="character-select-modal"
				className=" bg-white flex justify-between items-center bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg border border-white border-opacity-60 fixed inset-14 rounded-3xl"
			>
				<Canvas className="absolute inset-0">
					<ambientLight intensity={2} />
					<pointLight position={[10, 10, 10]} />
					<Carousel rotation={rotation} />
				</Canvas>
				<button
					onClick={() => rotateCarousel(1)}
          className='absolute -left-4'
				>
					<FaCircleChevronLeft className="size-12 text-indigo-600" />
				</button>
				<button
					onClick={() => rotateCarousel(-1)}
          className='absolute -right-4'
				>
					<FaCircleChevronRight className="size-12 text-indigo-600" />
				</button>
			</div>
		</>
	)
}

export default CharacterChange
