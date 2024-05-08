import React from 'react'
import CreateRoomButton from './CreateRoomButton'
import QuickStart from './QuickStart'

const HeaderNavigationBar = () => {
  return (
    <section className="h-14 flex justify-between items-center absolute bg-white top-0 w-full px-4 select-none">
      <fieldset>
        <div className="text-purple-300 font-bold my-auto text-center text-2xl px-3">LOGO</div>
      </fieldset>

      <fieldset className="flex gap-3">
        <CreateRoomButton />
        <QuickStart />
      </fieldset>
    </section>
  )
}

export default HeaderNavigationBar
