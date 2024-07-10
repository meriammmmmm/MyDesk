import { RootState, useAppDispatch } from '@src/store'
import { addedAudience, removeAudience } from '@src/store/slices/rules/rulesSlice'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useSelector } from 'react-redux'
interface GuestCheckboxProp {
  id: any
  name: string
}
const GuestCheckbox = ({ id, name }: GuestCheckboxProp) => {
  const dispatch = useAppDispatch()
  const { listOfAudience } = useSelector((state: RootState) => state.rules)
  const onChange = (e: CheckboxChangeEvent) => {
    e.target.checked
      ? dispatch(addedAudience({ id: String(id), name }))
      : dispatch(removeAudience({ id: String(id), name }))
  }
  return <Checkbox checked={listOfAudience?.includes(String(id))} onChange={onChange} />
}

export default GuestCheckbox
