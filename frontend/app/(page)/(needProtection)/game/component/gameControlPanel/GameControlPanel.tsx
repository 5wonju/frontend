import { useAuth } from '@/app/hooks/useAuth'
import CharacterChange from './CharacterChange'
import ReadyButton from './ReadyButton'
import StartButton from './StartButton'
import { useGameRoomStore } from '../../lib/store'
import { useState } from 'react'

const GameControlPanel = () => {
  let isRoomOwner = false;
  const { userInfo } = useAuth()
  const { gameUserList } = useGameRoomStore((state) => ({
    gameUserList: state.gameUserList,
  }))

  if (gameUserList) {
    const roomOwner = gameUserList.find(
      (user) => user.userNickname === userInfo.nickname
    )?.roomOwner
    if (roomOwner !== undefined) {
      isRoomOwner = roomOwner
    }
  }

  return (
    <div className="absolute inline-flex flex-col bottom-16 right-6 items-end gap-3">
      <CharacterChange />
      {/* 
        StartButton : 게임 시작 버튼 (for Host)
        ReadyButton : 게임 준비 버튼 (팀 여부를 보여줌 for Guest)
      */}
      {isRoomOwner ? <StartButton /> : <ReadyButton />}
    </div>
  )
}

export default GameControlPanel
