'use client'

import React from 'react'

interface WriteProblemNumberProps {
  probNum: number
  setProbNum: (num: number) => void
}

const WriteProblemNumber = ({ probNum, setProbNum }: WriteProblemNumberProps) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Problem Number (10-100)</label>
      <input
        type="number"
        value={probNum}
        onChange={(e) => setProbNum(parseInt(e.target.value))}
        placeholder="Enter problem number"
        min="10"
        max="100"
        className="w-full border p-2 rounded"
      />
    </div>
  )
}

export default WriteProblemNumber
