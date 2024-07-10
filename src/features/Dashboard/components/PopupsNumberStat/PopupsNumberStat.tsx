import { ReactComponent as IgnoredIcon } from '@assets/icons/dashboard/ignoredpopup.svg'
import { ReactComponent as NumberIcon } from '@assets/icons/dashboard/numberofpopup.svg'
interface PopupsNumberStatProp {
  label: string
  number: string
  forWhat: string
}
const PopupsNumberStat = ({ label, number, forWhat }: PopupsNumberStatProp) => {
  return (
    <div className="popup-number-stat-container">
      <div className="popup-number-stat-description">
        <div className="popup-number-stat-title">
          {forWhat === 'number' ? <NumberIcon /> : <IgnoredIcon />}
          <span>{label}</span>
        </div>
        <p className="number-stat">{number}</p>
      </div>
      {/* {forWhat === 'number' ? (
        <CircleLoader percent={0.7} mainColor={'#5BC949'} secondColor={'#D8F2D4'} />
      ) : (
        <CircleLoader percent={0.3} mainColor={'#605DCE'} secondColor={'#E4E4F7'} />
      )} */}
    </div>
  )
}

export default PopupsNumberStat
