import React from 'react'
import { ITeamInfoProps } from '../../lib/type'
import { teamEnum } from '../../lib/store-type'
import { teamColorToCssText } from '../../lib/util'

const TeamInfo = ({
  teamName,
  teamColor,
  userList,
  gameUserScore,
  handleOutUser,
  teamScore = 0,
}: ITeamInfoProps) => {
  return (
    <div
      className={`flex flex-col gap-1 w-full pb-2 ${
        teamColor === teamEnum.NONE ? '' : 'border-b border-lightGray5'
      }`}
    >
      <div>
        <h2 className={`${teamColorToCssText[teamColor as teamEnum]} font-bold`}>{teamName}</h2>
        {teamColor !== teamEnum.NONE && (
          <p className={`${teamColorToCssText[teamColor as teamEnum]}`}>팀 점수 {teamScore}</p>
        )}
      </div>
      <ul>
        {gameUserScore
          ? gameUserScore.map((user) => (
              <li
                key={Object.keys(user)[0]}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="flex items-end gap-2">
                  <span className={`${teamColorToCssText[teamColor as teamEnum]}`}>
                    {user.nickname}
                  </span>
                  <span className="text-darkGray1 font-light text-xs">{user.point}</span>
                </div>
              </li>
            ))
          : userList &&
            userList
              .filter((user) => user.team === teamColor)
              .map((user, index) => (
                <li
                  key={index+user.userNickname}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <div className="flex items-end gap-2">
                    <span className={`${teamColorToCssText[teamColor as teamEnum]}`}>
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
