import React from 'react'
import { useMainSocketStore } from '../../channel/lib/store'
import { playerMoveStateEnum, useGameRoomStore } from '../lib/store'
import OtherController from './OtherController'

// forward: 'forward',
// back: 'back',
// left: 'left',
// right: 'right',
// jump: 'jump',
// RED, BLUE, NONE

export interface IOtherStatus {
  pos: { x: number; y: number; z: number }
  linvel: { x: number; y: number; z: number }
  moveState: string
  characterType: number
  direction: string
  nickname: string
  team: string
}

const samplePlayers: IOtherStatus[] = [
  {
    pos: { x: 0, y: 0, z: 3 },
    moveState: playerMoveStateEnum.IDLE,
    characterType: 2,
    direction: 'right',
    nickname: '??dsad',
    team: 'red',
  },
  // {
  //   pos: { x: 4, y: 0, z: 0 },
  //   moveState: playerMoveStateEnum.RUN,
  //   characterType: 1,
  //   direction: 'right',
  //   nickname: '!!!옆에대단한사람이있어요',
  //   team: 'blue',
  // },
]

export default function OtherPlayers() {
  const { socket } = useMainSocketStore()
  const { gameUserList } = useGameRoomStore()
  return (
    <>
      {gameUserList?.map((player, index) => {
        return <OtherController key={index} {...player} />
      })}
    </>
  )
}
