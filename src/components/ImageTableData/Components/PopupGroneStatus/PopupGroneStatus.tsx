import { Popover } from 'antd'
import { isDateInFuture } from './helpersFunc'

const PopupGroneStatus = ({ schedule, isCanceled }: any) => {
  const newSchedule = schedule?.length > 0 ? schedule[0] : null
  const status = isDateInFuture(newSchedule?.startDate, newSchedule?.endDate)
  const content = (
    <div className="schedule-popover">
      <p>
        Start Date: <span>{newSchedule?.startDate}</span>
      </p>
      <p>
        End Date: <span>{newSchedule?.endDate}</span>
      </p>
    </div>
  )

  return (
    <div className="popup-grone-status">
      {isCanceled ? (
        <Popover placement="bottom" content={content} trigger="hover">
          <span className="grone-canceled">Canceled</span>
        </Popover>
      ) : status === 'Running' ? (
        <Popover placement="bottom" content={content} trigger="hover">
          <span className="grone-running">{status}</span>
        </Popover>
      ) : status === 'Pending' ? (
        <Popover placement="bottom" content={content} trigger="hover">
          <span className="grone-pending">{status}</span>
        </Popover>
      ) : status === 'Finished' ? (
        <span className="grone-finished">{status}</span>
      ) : status === 'Draft' ? (
        <span className="grone-draft">Draft</span>
      ) : null}
    </div>
  )
}

export default PopupGroneStatus
