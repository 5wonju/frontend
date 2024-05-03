import React from 'react'
import { useSocketStore } from '../(page)/channel/lib/store'

const Chat = () => {
  const { sendMessage } = useSocketStore()
  return (
    <>
      <div>채팅 컴포넌트</div>
      <input type="text" />
      <button onClick={() => sendMessage('test')}>전송</button>
    </>
  )
}

export default Chat
