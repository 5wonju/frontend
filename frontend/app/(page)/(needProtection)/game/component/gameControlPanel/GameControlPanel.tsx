import CharacterChange from './CharacterChange'
import ReadyButton from './ReadyButton'
import StartButton from './StartButton'

const GameControlPanel = () => {
  
  return (
    <div className="absolute inline-flex flex-col bottom-16 right-6 items-end gap-3">
      <CharacterChange />
      {/* <StartButton /> */}
      <ReadyButton />
    </div>
  )
}

export default GameControlPanel
