//@ts-nocheck

import React, { useEffect, useState } from 'react'

import { useGameRoomStore } from '../lib/store'
import OtherController from './OtherController'
import { playerMoveStateEnum, teamEnum } from '../lib/store-type'
import { useAuth } from '@/app/hooks/useAuth'
import { useMainSocketStore } from '@/app/lib/store'

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
  nickname: string
  team: teamEnum
  modelKey: number
}

const samplePlayers: IOtherStatus[] = [
  {
    pos: { x: 0, y: 0, z: 3 },
    moveState: playerMoveStateEnum.IDLE,
    characterType: 2,
    nickname: '??dsad',
    team: teamEnum.RED,
    linvel: { x: 0, y: 0, z: 0 },
    modelKey: 6,
  },
  {
    pos: { x: 4, y: 0, z: 0 },
    moveState: playerMoveStateEnum.RUN,
    characterType: 0,
    nickname: '!!!옆에대단한사람이있어요',
    team: teamEnum.BLUE,
    linvel: { x: 0, y: 0, z: 3 },
    modelKey: 7,
  },
]

export default function OtherPlayers() {
  // test test test test test
  // const [players, setPlayers] = useState([
  //   {
  //     pos: { x: 0, y: 0, z: 0 },
  //     moveState: playerMoveStateEnum.RUN,
  //     characterType: 2,
  //     nickname: '??dsad',
  //     team: teamEnum.RED,
  //     linvel: { x: -3, y: 0, z: 3 },
  //     modelKey: 6,
  //   },
  // ])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setPlayers((currentPlayers) =>
  //       currentPlayers.map((player) => ({
  //         ...player,
  //         linvel: {
  //           ...player.linvel,
  //           x: player.linvel.x,
  //           y: player.linvel.y,
  //           z: player.linvel.z,
  //         },
  //       }))
  //     )
  //   }, 1000) // 0.1초 마다 실행
  //   return () => clearInterval(intervalId)
  // }, [])
  // test test test test test
  const { socket } = useMainSocketStore()
  const { gameUserList } = useGameRoomStore()
  const { userInfo } = useAuth()
  console.log(gameUserList)
  return (
    <>
      {gameUserList &&
        gameUserList
          .filter((user) => user.userNickname !== userInfo.nickname)
          .map((player, index) => {
            return (
              <OtherController
                key={player.userNickname}
                pos={player.position}
                moveState={player.moveState ? player.moveState : playerMoveStateEnum.IDLE}
                characterType={player.characterType}
                nickname={player.userNickname}
                team={player.team}
                linvel={player.linvel}
                modelKey={index}
              />
            )
          })}
      {/* {players.map((player, index) => {
        return <OtherController key={index} {...player} />
      })} */}
    </>
  )
}
