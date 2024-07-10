import { Dispatch, SetStateAction } from 'react'
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai'
interface AlignCompProps {
  label: string
  setActiveButton: Dispatch<SetStateAction<string>>
  setAlignment: Dispatch<SetStateAction<string>>
  activeButton: string
}
const AlignComp = ({ label, activeButton, setAlignment, setActiveButton }: AlignCompProps) => {
  const handleButtonClick = (value: string) => {
    setAlignment(value)
    setActiveButton(value)
  }
  return (
    <div className="align-comp-container">
      <span className="align-comp-label">{label}</span>
      <div className="align-buttons">
        <AiOutlineAlignLeft
          onClick={() => handleButtonClick('left')}
          className={activeButton === 'left' ? 'active' : ''}
        />
        <AiOutlineAlignCenter
          onClick={() => handleButtonClick('center')}
          className={activeButton === 'center' ? 'active' : ''}
        />
        <AiOutlineAlignRight
          onClick={() => handleButtonClick('right')}
          className={activeButton === 'right' ? 'active' : ''}
        />
      </div>
    </div>
  )
}

export default AlignComp
