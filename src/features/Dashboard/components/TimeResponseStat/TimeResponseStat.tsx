import { ReactComponent as TimeResponseIcon } from '@assets/icons/dashboard/timeresponse.svg'
const TimeResponseStat = () => {
  return (
    <div className="time-response-stat-container">
      <div className="time-response-stat-title">
        <TimeResponseIcon />
        <span>Average Time Response</span>
      </div>
      <p>10 min</p>
    </div>
  )
}

export default TimeResponseStat
