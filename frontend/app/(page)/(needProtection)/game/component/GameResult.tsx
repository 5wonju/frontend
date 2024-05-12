const GameResult = () => {
  // 게임 결과 모달창
  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white z-30 inset-32 flex flex-col justify-around items-center bg-opacity-60 backdrop-filter backdrop-blur-md shadow-lg border border-white border-opacity-60 fixed rounded-3xl">
        <h1 className="text-2xl font-bold text-center">게임 결과</h1>
        <div className="flex justify-center items-center mt-4">
          <div className="flex flex-col items-center">
            <p className="text-lg">승리팀</p>
            <div className="flex items-center mt-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
              <div className="w-12 h-12 bg-blue-500 rounded-full ml-2"></div>
            </div>
          </div>
          <div className="flex flex-col items-center mx-4">
            <p className="text-lg">패배팀</p>
            <div className="flex items-center mt-2">
              <div className="w-12 h-12 bg-red-500 rounded-full"></div>
              <div className="w-12 h-12 bg-red-500 rounded-full ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameResult
