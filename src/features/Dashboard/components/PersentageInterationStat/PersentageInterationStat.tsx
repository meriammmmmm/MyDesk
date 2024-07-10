import { Interaction } from '@src/store/slices/analytics/analyticSlice'
import { BiLike } from 'react-icons/bi'
import InteractionGraph from './graph/InteractionGraph'

interface PersentageInterationStatProps {
  interactions: Interaction[]
}

const PersentageInterationStat = ({ interactions }: PersentageInterationStatProps) => {
  return (
    <div className="percentage-interation-stat-container">
      <div className="percentage-interaction-title">
        <div className="interaction-icon">
          <BiLike />
        </div>
        <p>Interaction percentage</p>
      </div>
      <InteractionGraph interactions={interactions} />
    </div>
  )
}

export default PersentageInterationStat
