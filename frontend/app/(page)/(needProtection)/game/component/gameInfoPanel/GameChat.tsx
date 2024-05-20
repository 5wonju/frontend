import Chat from '@/app/component/Chat/Chat'
import React, { useState } from 'react'

const GameChat = () => {
  const [height, setHeight] = useState(33) // Default height as a percentage

  const handleMouseDown = (e: any) => {
    const startY = e.clientY
    const startHeight = height

    const onMouseMove = (e: any) => {
      const newHeight = startHeight + (startY - e.clientY)
      const newHeightPercentage = (newHeight / window.innerHeight) * 100

      if (newHeightPercentage >= 10 && newHeightPercentage <= 80) {
        setHeight(newHeightPercentage)
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <section
      className="w-1/3 absolute bottom-0 left-0 rounded overflow-hidden"
      style={{ height: `${height}vh` }}
    >
      <div
        className="z-50 w-full bg-white absolute"
        style={{ height: '10px', cursor: 'row-resize' }}
        onMouseDown={handleMouseDown}
      />
      <Chat type="game" />
    </section>
  )
}

export default GameChat
