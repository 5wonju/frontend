const IntroductionContent = () => {
  return (
    <div className="select-none">
      <h1 className="glass flex justify-between text-black px-5">
        <fieldset className="flex gap-3">
          <span>001</span>
          <span>원주의방</span>
        </fieldset>
        <fieldset className="flex gap-3">
          <span>개발</span>
          <span>8 Round</span>
          {/* 게임 시작 후에 보일 부분 */}
          <span>2/8</span>
        </fieldset>
      </h1>
    </div>
  )
}

export default IntroductionContent
