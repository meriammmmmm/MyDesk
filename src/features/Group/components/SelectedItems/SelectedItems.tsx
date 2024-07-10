import Button from '@src/components/Button/Button'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { useAppDispatch } from '@store/index'
import { addedAudience, removeAudience } from '@src/store/slices/rules/rulesSlice'
const SelectedItems = ({ guestUsers }: any) => {
  const { listOfAudienceName, listOfAudience } = useSelector((state: RootState) => state.rules)
  const dispatch = useAppDispatch()
  const handleSelectAll = () => {
    guestUsers?.map((el: any) => {
      const ID = el?._id ? String(el?._id) : String(el?.id)
      if (!listOfAudience.includes(ID)) {
        dispatch(addedAudience({ id: ID, name: el?.name }))
      }
    })
  }
  const handleUnselectAll = () => {
    guestUsers?.map((el: any) => {
      const ID = el?._id ? String(el?._id) : String(el?.id)
      dispatch(removeAudience({ id: ID, name: el?.name }))
    })
  }
  return (
    <div className="group-items-selected">
      <nav>
        <span>{listOfAudienceName.length}</span>
        <p>items selected</p>
      </nav>
      <div>
        <Button onClick={handleSelectAll}>Select All</Button>
        <Button variant="danger" onClick={handleUnselectAll}>
          Remove All
        </Button>
      </div>
    </div>
  )
}

export default SelectedItems
