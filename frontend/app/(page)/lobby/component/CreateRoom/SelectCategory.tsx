'use client'

import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

const CATEGORY_LIST = ['수학', '과학', '역사', '국어', '개발'] // 예시 카테고리 목록

interface SelectCategoryProps {
	probCategory: string
	setProbCategory: (category: string) => void
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
									category === probCategory ? 'bg-blue-200' : ''
								}`}
								onClick={() => {
									setProbCategory(category)
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
