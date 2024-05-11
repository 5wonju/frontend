'use client'

import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { ProblemCategoryType } from '../../lib/type'

const CATEGORY_LIST: ProblemCategoryType[] = ['개발', '과학', '컴퓨터', '한국사', '근현대사']

interface SelectCategoryProps {
  probCategory: ProblemCategoryType[]
  setProbCategory: React.Dispatch<React.SetStateAction<ProblemCategoryType[]>>
}

const SelectCategory = ({ probCategory, setProbCategory }: SelectCategoryProps) => {
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
          {probCategory}
        </button>
        {isCategoryOpen && (
          <ul
            className="absolute w-full border rounded mt-1 bg-white z-10"
            aria-labelledby="category-button"
          >
            {CATEGORY_LIST.map((category) => (
              <li
                key={category}
                className={`p-2 hover:bg-blue-100 ${
                  probCategory.includes(category) ? 'bg-blue-200' : ''
                }`}
                onClick={() => {
                  setProbCategory((prev) =>
                    prev.includes(category)
                      ? prev.filter((selectedCategory) => selectedCategory !== category)
                      : [...prev, category]
                  )
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
