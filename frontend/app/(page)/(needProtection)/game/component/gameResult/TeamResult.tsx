/* eslint-disable @next/next/no-img-element */
import { teamEnum } from '../../lib/store-type'
import { IUserResult, TeamResultProps } from '../../lib/type'
import { teamColorToCssBg, teamColorToCssText } from '../../lib/util'

const emojis = [
  <img
    key={1}
    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20One.png"
    alt="Keycap Digit One"
    className="size-10"
  />,
  <img
    key={2}
    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20Two.png"
    alt="Keycap Digit Two"
    className="size-10"
  />,
  <img
    key={3}
    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20Three.png"
    alt="Keycap Digit Three"
    className="size-10"
  />,
  <img
    key={4}
    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20Four.png"
    alt="Keycap Digit Four"
    className="size-10"
  />,
  <img
    key={5}
    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20Five.png"
    alt="Keycap Digit Five"
    className="size-10"
  />,
]

const TeamResult = ({ team, isWin, teamPoint, teamResult }: TeamResultProps) => {
  return (
    <section className={`w-full h-full ${isWin ? 'scale-105' : 'scale-90'}`}>
      <fieldset className="flex items-center gap-4 h-28">
        <h3 className={`${teamColorToCssText[team as teamEnum]} font-bold text-5xl`}>
          <span
            className={`${team === teamEnum.RED ? 'redTeam' : 'blueTeam'} px-3`}
          >
            {team}
          </span>
         <span className="px-3 font-semibold text-3xl">{teamPoint}점</span>
        </h3>
        <h3 className="py-2">
          {isWin ? (
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png"
              alt="Beaming Face with Smiling Eyes"
              className="h-20"
            />
          ) : (
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
              alt="Crying Face"
              className="h-20"
            />
          )}
        </h3>
      </fieldset>
      <ul className="flex flex-col gap-4 w-full h-4/5 pt-8">
        {teamResult.map((user: IUserResult, index) => (
          <li
            key={user.userId}
            className={`flex justify-between gap-5 *:text-3xl glass ${
              isWin ? 'text-black' : 'text-darkGray1 bg-neutral-600 bg-opacity-25'
            } px-4 py-4 pr-6 ${user.amIMe ? 'bg-yellow-400 bg-opacity-50' : ''}`}
          >
            <span>{emojis[index]}</span>
            <span className="font-medium">{user.username}</span>
            <span className="font-semibold">{user.earnPoint}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TeamResult
