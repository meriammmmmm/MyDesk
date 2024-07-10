import { Col, Slider, InputNumber } from 'antd'
interface RangeCompProps {
  label: string
  value: any
  min: number
  max: number
  onChange: any
}
export const RangeComp = ({ label, value, onChange, min, max }: RangeCompProps) => (
  <div className="range-comp-container">
    <span className="range-comp-label">{label}</span>
    <Col span={12}>
      <Slider min={min} max={max} onChange={onChange} value={value} />
    </Col>
    <Col span={4}>
      <InputNumber
        min={min}
        max={max}
        style={{ margin: '0 16px' }}
        value={value}
        onChange={onChange}
      />
    </Col>
  </div>
)
