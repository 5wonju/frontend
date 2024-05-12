import React from 'react'
import { ITeamInfoProps } from '../../lib/type'
import { teamEnum } from '../../lib/store-type'
import { teamColorToCss } from '../../lib/util'

const TeamInfo = ({ teamName, teamColor, userList, handleOutUser, teamScore = 0 }: ITeamInfoProps) => {
  return (
    <div
      className={`flex flex-col gap-1 w-full pb-2 ${
        teamColor === teamEnum.NONE ? '' : 'border-b border-lightGray5'
      }`}
    >
      <div>
        <h2 className={`${teamColorToCss[teamColor as teamEnum]} font-bold`}>{teamName}</h2>
        {teamColor !== teamEnum.NONE && (
          <p className={`${teamColorToCss[teamColor as teamEnum]}`}>팀 점수 {teamScore}</p>
        )}
      </div>
      <ul className="">
        {userList &&
          userList
            .filter((user) => user.team === teamColor)
            .map((user) => (
              <li
                key={user.userNickname}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="flex items-end gap-2">
                  <span className={`${teamColorToCss[teamColor as teamEnum]}`}>
                    {user.userNickname}
                  </span>
                  <span className="text-darkGray1 font-light text-xs">{user.userScore}</span>
                </div>

                {/* TODO: 플레이어 강퇴 기능 추가하기 */}
                {/* <button onClick={() => handleOutUser(user.userNickname)} className="text-lightGray1">
                  <IoIosCloseCircleOutline />
                </button> */}
              </li>
            ))}
      </ul>
    </div>
  )
}

export default TeamInfo
