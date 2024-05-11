'use client'

import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { ProblemCategoryType, RoomEditProps } from '../../lib/type'

const CATEGORY_LIST: ProblemCategoryType[] = ['개발', '과학', '컴퓨터', '한국사', '근현대사']

const SelectCategory = ({ roomInfo, setRoomInfo }: RoomEditProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const ref = useRef(null)

  useClickAway(ref, () => setIsCategoryOpen(false))

  return (
    <div className="mt-2">
      <label className="block text-sm font-bold">Problem Category</label>
      <div ref={ref} className="relative">
        <button
          className="w-full border p-2 rounded cursor-pointer"
          aria-haspopup="true"
          aria-expanded={isCategoryOpen}
          id="category-button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          {roomInfo.probCategory}
        </button>
        {isCategoryOpen && (
          <ul
            className="absolute w-full border rounded mt-1 bg-white z-10"
            aria-labelledby="category-button"
          >
            {roomInfo.probCategory &&
              roomInfo.probCategory.length > 0 &&
              CATEGORY_LIST.map((category) => (
                <li
                  key={category}
                  className={`p-2 hover:bg-blue-100 ${
                    roomInfo.probCategory.includes(category) ? 'bg-blue-200' : ''
                  }`}
                  onClick={() => {
                    setRoomInfo((prev) => ({
                      ...prev,
                      probCategory: prev.probCategory.includes(category)
                        ? prev.probCategory.filter(
                            (selectedCategory) => selectedCategory !== category
                          )
                        : [...prev.probCategory, category],
                    }))
                    setIsCategoryOpen(false)
                  }}
                  role="menuitem"
                >
                  {category}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SelectCategory
