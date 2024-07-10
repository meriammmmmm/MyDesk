import { popupStat } from './data'
import StatProgress from './components/StatProgress/StatProgress'

const TableDashboardStat = () => {
  return (
    <div className="table-dashboard-stat">
      <div className="table">
        <div className="table-head">
          <div className="col">Title</div>
          <div className="col">Reaction</div>
          <div className="col">Comment</div>
          <div className="col">Rate</div>
        </div>
        <div className="table-body-container">
          {popupStat.map(({ title, reaction, comment, rate }: any, i: number) => {
            return (
              <div key={i} className="table-body-row">
                <div className="col">{title}</div>
                <div className="col">{reaction}</div>
                <div className="col">{comment}</div>
                <div className="col rate-stat">
                  {rate}
                  <StatProgress percent={rate} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TableDashboardStat
