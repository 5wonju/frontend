import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IIntroImage {
	mainImg: string
	subImg: string
}
const imageUrls: IIntroImage[] = [
	{
		mainImg: '/intro-img/intro1-1.png',
		subImg: '/intro-img/intro1-2.png',
	},
	{
		mainImg: '/intro-img/intro2-1.png',
		subImg: '/intro-img/intro2-2.png',
	},
	{
		mainImg: '/intro-img/intro3-1.png',
		subImg: '/intro-img/intro3-2.png',
	},
]
const PreviewImage = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const interval = 4000

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1))
		}, interval)

		return () => clearInterval(intervalId)
	}, [imageUrls.length, interval])
	return (
		<div className="">
			{imageUrls.map(
				(image, index) =>
					index === currentImageIndex && (
						<div
							key={index}
							className="relative h-full animate-floating
						 flex flex-col items-center justify-center gap-4"
						>
							<Image
								src={image.mainImg}
								alt="Description of the game1"
								width={200}
								height={200}
								layout="responsive"
								className={`absolute h-full top-0 bottom-16 z-10 ${
									index === currentImageIndex ? 'animate-faceInFromButtom1' : ''
								}`}
							/>
							<Image
								src={image.subImg}
								alt="Description of the game2"
								width={200}
								height={200}
								layout="responsive"
								className={`absolute h-full top-16 bottom-0 ${
									index === currentImageIndex ? 'animate-faceInFromButtom2' : ''
								}`}
							/>
						</div>
					)
			)}
		</div>
	)
}

export default PreviewImage
