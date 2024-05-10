import { useRouter } from "next/navigation"

const Exit = () => {
  const navigate = useRouter()

  const handleExitBtn = () => {
    navigate.back()
    // 방에서 나가기
    // TODO: useSearchParams로 replace해서 로비로 이동
  }
  return (
    <button onClick={handleExitBtn} className="nav-btn">
      나가기
    </button>
  )
}

export default Exit
