import { Analytic } from '@src/store/slices/analytics/analyticSlice'
import ApexChart from './ApexChart/ApexChart'
interface PopupReactionGraphProps {
  analytics: Analytic[]
}
const PopupReactionGraph = ({ analytics }: PopupReactionGraphProps) => {
  return (
    <div className="popup-reaction-graph-container">
      <p className="popup-reaction-graph-title">Highest reaction</p>
      <ApexChart analytics={analytics} />
    </div>
  )
}
export default PopupReactionGraph
