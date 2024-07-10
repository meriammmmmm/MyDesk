import { RingProgress } from '@ant-design/plots'
interface CircleColorProp {
  mainColor: string
  secondColor: string
  percent: number
}
const CircleLoader = ({ mainColor, secondColor, percent }: CircleColorProp) => {
  const config = {
    height: 88,
    width: 92,
    autoFit: false,
    percent: percent,
    color: [mainColor, secondColor],
  }
  return <RingProgress {...config} />
}

export default CircleLoader
