import { Analytic } from '@src/store/slices/analytics/analyticSlice'

import { Area } from '@ant-design/plots'
interface ApexChartProps {
  analytics: Analytic[]
}
const ApexChart = ({ analytics }: ApexChartProps) => {
  const config = {
    data: analytics,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  }
  return (
    <div style={{ width: '100%' }}>
      <div id="chart">
        {/* <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        /> */}
        <Area {...config} />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}

export default ApexChart
