import { MutableRefObject } from 'react'
import EditOption from '../EditOption/EditOption'

interface DashedLineProps {
  indexOfNewItem: number
  index: number
  refs: MutableRefObject<null>[]
}

const DashedLine = ({ refs, indexOfNewItem, index }: DashedLineProps) => {
  return indexOfNewItem === index ? (
    <div ref={refs[0]} className="dashedline-container">
      <div className="dashedline-line"></div>
      <div className="dashedline-button-parameter">
        <EditOption editorOptionRefs={[refs[1], refs[2], refs[3]]} />
      </div>
    </div>
  ) : null
}

export default DashedLine
