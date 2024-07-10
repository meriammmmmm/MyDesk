import { Checkbox } from 'antd'
// import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
interface rulesCheckboxProps {
  label: string
  checkboxList: string[]
}
const RulesCheckBox = ({ label, checkboxList }: rulesCheckboxProps) => {
  const { audience } = useSelector((state: RootState) => state.rules)
  return (
    <div className="rules-checkbox-container">
      <p className="rules-checkbox-label">{label}</p>
      <div className="rules-checkboxes">
        {checkboxList.map((el: string, index: number) => {
          return (
            <Checkbox disabled={!audience} name={'d'} className="rules-checkbox-item" key={index}>
              {el}
            </Checkbox>
          )
        })}
      </div>
    </div>
  )
}

export default RulesCheckBox
