import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { gameMode } from '../../lib/type'

interface SelectGameModeProps {
  gameMode: gameMode
  setGameMode: (mode: gameMode) => void
}

const SelectGameMode = ({ gameMode, setGameMode }: SelectGameModeProps) => {
  const [isGameModeOpen, setIsGameModeOpen] = useState(false)
  const ref = useRef(null)

  useClickAway(ref, () => setIsGameModeOpen(false))

  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Game Mode</label>
      {/* <select
						className="w-full border p-2 rounded"
						value={gameMode}
						onChange={(e) => setGameMode(e.target.value)}
					>
						<option value="BASIC">베이직</option>
						<option value="YOOT">윷놀이</option>
					</select> */}

      <div ref={ref} className="relative">
        <button
          aria-haspopup="true"
          aria-expanded={false}
          id="player-count-button"
          onClick={() => setIsGameModeOpen(!isGameModeOpen)}
          className="w-full border p-2 rounded cursor-pointer"
        >
          {gameMode === 'BASIC' ? '베이직' : '윷놀이'}
        </button>
        {isGameModeOpen && (
          <ul
            className="absolute w-full border rounded mt-1 bg-white z-10"
            aria-labelledby="game-mode-button"
          >
            {(['BASIC', 'YOOT'] as gameMode[]).map((mode) => (
              <li
                key={mode}
                className={`p-2 hover:bg-blue-100 ${mode === gameMode ? 'bg-blue-200' : ''}`}
                onClick={() => {
                  setGameMode(mode)
                  setIsGameModeOpen(false)
                }}
                role="menuitem"
              >
                {mode === 'BASIC' ? '베이직' : '윷놀이'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SelectGameMode
