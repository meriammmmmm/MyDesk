import { useAppDispatch } from '@store/index'
import { toggleAudience, toggleBehavior, toggleSchedule } from '@src/store/slices/rules/rulesSlice'
import { Switch } from 'antd'
interface RulesTitleProps {
  value: string
  icon: any
  isActive: boolean
}
const RulesTitle = ({ isActive, value, icon }: RulesTitleProps) => {
  const dispatch = useAppDispatch()
  const onChange = (_checked: boolean) => {
    if (value === 'schedule') {
      dispatch(toggleSchedule())
    } else if (value === 'Audience') {
      dispatch(toggleAudience())
    } else {
      dispatch(toggleBehavior())
    }
  }
  return (
    <div className="rules-title-container">
      <nav className="rules-title-description">
        {icon}
        <span>{value}</span>
      </nav>
      <nav className="rules-title-navigation">
        {isActive ? <p>active</p> : <p>inActive</p>}
        <Switch
          style={{ backgroundColor: `${isActive ? '#5BC949' : '#BDBEBE'}` }}
          checked={isActive}
          onChange={onChange}
        />
      </nav>
    </div>
  )
}

export default RulesTitle
