import { useEffect, useState } from 'react'

// 3, 2, 1 순으로 카운트다운을 보여주는 컴포넌트
const CountdownContent = () => {
  const [count, setCount] = useState(3)

  useEffect(() => {
    // 0까지만 카운트다운
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-full select-none">
      <h1 className="text-9xl font-bold text-white h-full">{count ? count : 'START'}</h1>
    </div>
  )
}

export default CountdownContent
