const ReadyButton = () => {
  const readyStatus = true
  // const readyStatus = false

  return (
    <button
      className={`bg-gradient-to-bl uppercase transition-colors border-8 border-orange-50 font-bold text-4xl py-4 px-10 rounded-full shadow-md ${
        readyStatus
          ? 'from-orange-300 to-orange-500 text-lightGray5'
          : 'from-lightGray2 to-lightGray1 text-darkGray3'
      }`}
    >
      ready
    </button>
  )
}

export default ReadyButton
