import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './Carousel'

const CharacterChange = ({ numItems = 6, radius = 2 }) => {
	const [rotation, setRotation] = useState(0.6)
	console.log(rotation)
	const step = (Math.PI * 2) / numItems // 각 아이템 간의 각도

	const handleOpenModal = () => {
		console.log('캐릭터 변경 모달 열기')
		const element = document.getElementById('character-select-modal')
		if (element) {
			element.classList.remove('hidden')
		}
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
				className="hidden fixed inset-10 rounded-2xl bg-gray-500 bg-opacity-75 flex justify-center items-center"
			>
				<Canvas>
					<ambientLight />
					<pointLight position={[0, 0, 0]} />
					<Carousel rotation={rotation} />
				</Canvas>
				<button
					style={{ position: 'absolute', top: 20, left: 20 }}
					onClick={() => rotateCarousel(1)}
				>
					Rotate Left
				</button>
				<button
					style={{ position: 'absolute', top: 20, left: 100 }}
					onClick={() => rotateCarousel(-1)}
				>
					Rotate Right
				</button>
			</div>
		</>
	)
}

export default CharacterChange
