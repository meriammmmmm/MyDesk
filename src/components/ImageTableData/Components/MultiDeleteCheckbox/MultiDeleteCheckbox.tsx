import { RootState } from '@src/store'
import { addedItemToRemove, removeItemFromRemove } from '@src/store/slices/post/postSlice'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@store/index'
import { addedToGroupsToDelete, removeFromGroupsToDelete } from '@src/store/slices/group/groupSlice'
interface MultiDeleteCheckboxProp {
  id: string
  group: boolean
  posts: boolean
}
const MultiDeleteCheckbox = ({ id, group, posts }: MultiDeleteCheckboxProp) => {
  const dispatch = useAppDispatch()
  const { listOfItemToRemove } = useSelector((state: RootState) => state.post)
  const { listOfGroupsToDelete } = useSelector((state: RootState) => state.group)
  let isChecked
  if (posts) {
    isChecked = listOfItemToRemove?.includes(id)
  } else if (group) {
    isChecked = listOfGroupsToDelete?.includes(id)
  }
  const onChange = (e: CheckboxChangeEvent) => {
    if (posts) {
      e.target.checked
        ? dispatch(addedItemToRemove({ id }))
        : dispatch(removeItemFromRemove({ id }))
    } else if (group) {
      e.target.checked
        ? dispatch(addedToGroupsToDelete({ id }))
        : dispatch(removeFromGroupsToDelete({ id }))
    }
  }
  return <Checkbox checked={isChecked} onChange={onChange} />
}

export default MultiDeleteCheckbox
