const StatProgress = ({ percent }: any) => {
  return (
    <div className="table-stat-procress">
      <div className="progress2 progress-moved">
        <div style={{ width: `${percent}` }} className="progress-bar2"></div>
      </div>
    </div>
  )
}

export default StatProgress
