import { Area } from '@ant-design/plots'

const AreaPlot = () => {
  const data = [
    { number: '10', time: '09h' },
    { number: '11', time: '10h' },
    { number: '350', time: '13h' },
    { number: '23', time: '15h' },
    { number: '31', time: '17h' },
  ]
  const config = {
    data,
    xField: 'time',
    yField: 'number',
    xAxis: {
      range: [0, 1],
      tickCount: 11,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#f7c0b3 1:#f7a899',
        fillOpacity: 0.5,
        cursor: 'pointer',
        stroke: 'transparent',
        lineDash: [4, 5],
      }
    },
  }

  return <Area style={{ width: '100%' }} {...config} />
}

export default AreaPlot
