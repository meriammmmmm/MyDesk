import { Pie } from '@ant-design/plots'
import { Interaction } from '@src/store/slices/analytics/analyticSlice'
interface InteractionGraphProps {
  interactions: Interaction[]
}
const InteractionGraph = ({ interactions }: InteractionGraphProps) => {
  const data = [...interactions]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    color: ['#50CCC5', '#B61AFF'],
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 18,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  }
  return <Pie {...config} />
}

export default InteractionGraph
