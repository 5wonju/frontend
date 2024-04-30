import React from 'react'
import CreateRoomButton from './CreateRoomButton'

const HeaderNavigationBar = () => {
	return (
		<section className="absolute bg-white top-0 h-12 w-full px-4 ">
			<CreateRoomButton />
		</section>
	)
}

export default HeaderNavigationBar
