import { Dispatch, SetStateAction } from 'react'
interface AlignCompProps {
  label: string
  setActiveWidth: Dispatch<SetStateAction<string>>
  setWidth: Dispatch<SetStateAction<string>>
  activeWidth: string
}
const WidthComp = ({ label, activeWidth, setWidth, setActiveWidth }: AlignCompProps) => {
  const handleButtonClick = (value: string) => {
    setWidth(value)
    setActiveWidth(value)
  }
  return (
    <div className="width-comp-container">
      <span className="width-comp-label">{label}</span>
      <div className="width-buttons">
        <div
          onClick={() => handleButtonClick('30%')}
          className={activeWidth === '30%' ? 'active' : ''}
        >
          30%
        </div>
        <div
          onClick={() => handleButtonClick('50%')}
          className={activeWidth === '50%' ? 'active' : ''}
        >
          50%
        </div>
        <div
          onClick={() => handleButtonClick('75%')}
          className={activeWidth === '75%' ? 'active' : ''}
        >
          75%
        </div>
        <div
          onClick={() => handleButtonClick('100%')}
          className={activeWidth === '100%' ? 'active' : ''}
        >
          100%
        </div>
      </div>
    </div>
  )
}

export default WidthComp
