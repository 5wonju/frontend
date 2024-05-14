import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { RoomEditProps } from '../../lib/type'

const SelectPlayerCount = ({ roomInfo, setRoomInfo }: RoomEditProps) => {
  const [isPlayerCountOpen, setIsPlayerCountOpen] = useState(false)
  const ref = useRef(null)

  useClickAway(ref, () => setIsPlayerCountOpen(false))

  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Player Count</label>
      {/* <select
    className="w-full border p-2 rounded"
    value={playerCount}
    onChange={(e) => setPlayerCount(Number(e.target.value))}
  >
    <option value={2}>2</option>
    <option value={4}>4</option>
    <option value={6}>6</option>
  </select> */}
      <div ref={ref} className="relative">
        <button
          aria-haspopup="true"
          aria-expanded={false}
          id="player-count-button"
          onClick={() => setIsPlayerCountOpen(!isPlayerCountOpen)}
          className="w-full border p-2 rounded cursor-pointer"
        >
          {roomInfo.maxUserNum}
        </button>
        {isPlayerCountOpen && (
          <ul
            className="absolute w-full border rounded mt-1 bg-white z-10"
            aria-labelledby="player-count-button"
          >
            {[2, 3, 4, 5, 6, 7, 8].map((count) => (
              <li
                key={count}
                className={`p-2 hover:bg-blue-100 ${count === roomInfo.maxUserNum ? 'bg-blue-200' : ''}`}
                onClick={() => {
                  setRoomInfo((prev) => ({ ...prev, maxUserNum: count }))
                  setIsPlayerCountOpen(false)
                }}
                role="menuitem"
              >
                {count}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SelectPlayerCount
