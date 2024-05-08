import React from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { ITeamInfoProps } from '../../lib/type'
import { teamEnum } from '../../lib/store-type'
import { teamColorToCss } from '../../lib/util'

const TeamInfo = ({ teamName, teamColor, userList, handleOutUser }: ITeamInfoProps) => {
  return (
    <div className={`flex flex-col gap-1 w-full pb-2 ${teamColor === teamEnum.NONE ? '' : 'border-b border-lightGray5'}`}>
      <h2 className={`${teamColorToCss[teamColor as teamEnum]} font-bold`}>{teamName}</h2>
      <ul className="">
        {userList
          .filter((user) => user.team === teamColor)
          .map((user) => (
            <li key={user.nickname} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-end gap-2">
                <span className={`${teamColorToCss[teamColor as teamEnum]}`}>{user.nickname}</span>
                <span className="text-darkGray1 font-light text-xs">{user.score}</span>
              </div>

              {/* 방장만 보이는 버튼 */}
              <button onClick={() => handleOutUser(user.userId)} className="text-lightGray1">
                <IoIosCloseCircleOutline />
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TeamInfo
