import Input from '@src/components/Input/Input'
import Button from '@src/components/Button/Button'
import { useAppDispatch, RootState } from '@store/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { updateGroup, createGroup } from '@store/slices/group/groupThunk'
import { generateMemebers } from './helpers/generateMemebers'
import { setAudienceToDefault } from '@src/store/slices/rules/rulesSlice'

const GroupCreationHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { groupToUpdate } = useSelector((state: RootState) => state.group)
  const { listOfAudienceName, listOfAudience } = useSelector((state: RootState) => state.rules)

  const members = generateMemebers(listOfAudienceName, listOfAudience)
  const [groupName, setGroupName] = useState(groupToUpdate?.name || '')
  function isValidString(str: string) {
    if (str.length < 2 || str.length > 40) {
      return false
    }
    return true
  }
  const handleAddGroup = () => {
    dispatch(setAudienceToDefault())
    if (!isValidString(groupName)) {
      message.error('invalid group name')
    } else {
      groupToUpdate?.name
        ? dispatch(
            updateGroup({
              id: groupToUpdate._id,
              name: groupName,
              members: members,
            }),
          ).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              message.success(result.payload.message)
              navigate('/group')
            }
          })
        : dispatch(createGroup({ name: groupName, members })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              message.success(result.payload.message)
              navigate('/group')
            }
          })
    }
  }

  return (
    <div className="group-creation-header">
      <div className="group-creaction-header-back-arrow">
        <h1 className="group-creation-header-title">
          {groupToUpdate ? 'Update Group' : 'Create Group'}
        </h1>
      </div>
      <div className="group-filed-creation">
        <Input
          className="group-search-input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setGroupName(event.target.value)
          }
          value={groupName}
          placeholder="Enter Group Name"
        />
        <Button className="group-creation-btn" onClick={handleAddGroup} size="xl">
          {groupToUpdate ? 'Update' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default GroupCreationHeader
