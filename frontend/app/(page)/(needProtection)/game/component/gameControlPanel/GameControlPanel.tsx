import { useAuth } from '@/app/hooks/useAuth'
import CharacterChange from './CharacterChange'
import ReadyButton from './ReadyButton'
import StartButton from './StartButton'
import { useGameRoomStore } from '../../lib/store'
import { useState } from 'react'
import RoomEditButton from './RoomEditButton'
import { gameStateEnum } from '../../lib/store-type'
import RespawnButton from './RespawnButton'

const GameControlPanel = () => {
  let isRoomOwner = false
  const { userInfo } = useAuth()
  const { gameUserList, gameState } = useGameRoomStore((state) => ({
    gameUserList: state.gameUserList,
    gameState: state.gameState,
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
    <>
      {gameState === gameStateEnum.READY && (
        <div className="absolute inline-flex flex-col bottom-16 right-6 items-end gap-3">
          <RespawnButton />
          <CharacterChange />

          {/* 방 정보 수정 버튼은 방장에개만 보임 */}
          {isRoomOwner && <RoomEditButton />}
          {/* 
            StartButton : 게임 시작 버튼 (for Host)
            ReadyButton : 게임 준비 버튼 (팀 여부를 보여줌 for Guest)
          */}
          {isRoomOwner ? <StartButton /> : <ReadyButton />}
        </div>
      )}
    </>
  )
}

export default GameControlPanel
