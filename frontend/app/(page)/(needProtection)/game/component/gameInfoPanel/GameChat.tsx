import Chat from '@/app/component/Chat/Chat'
import React from 'react'

const GameChat = () => {
  return (
    <section className="h-1/3 w-1/3 absolute bottom-0 left-0 rounded overflow-hidden glass">
      <Chat />
    </section>
  )
}

export default GameChat
