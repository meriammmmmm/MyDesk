import { addedToNotIcludesPost, removeFromNotIncludesPost } from '@src/store/slices/post/postSlice'
import { Switch } from 'antd'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import {
  addedToNotIcludesClient,
  removeFromNotIncludesClient,
} from '@src/store/slices/clientSlice/clientSlice'
import { addedToNotIcludesRole, removeFromNotIncludesRole } from '@src/store/slices/role/roleSlice'
import {
  addedToNotIcludesGroup,
  removeFromNotIncludesGroup,
} from '@src/store/slices/group/groupSlice'
const ToggleColumn = ({ isWhat, firstObj }: any) => {
  const { columnNotEncludedPost } = useSelector((state: RootState) => state.post)
  const { columnNotEncludedClient } = useSelector((state: RootState) => state.client)
  const { columnNotEncludedRole } = useSelector((state: RootState) => state.role)
  const { columnNotEncludedGroup } = useSelector((state: RootState) => state.group)
  const dispatch = useAppDispatch()
  const keysArray = []
  for (const key in firstObj) {
    if (
      ![
        'content',
        'dna',
        'ignored',
        'pushedAt',
        'commentCount',
        'reactCount',
        'avatar',
        'orgUsers',
        'isCanceled',
        'isDraft',
        'replayType',
        'emojis',
        'audience',
        'schedule',
        'behavior',
        'updatedAt',
      ].includes(key)
    ) {
      keysArray.push(key)
    }
  }
  let columnNotInclude: any
  switch (isWhat) {
    case 'post':
      columnNotInclude = columnNotEncludedPost
      break
    case 'client':
      columnNotInclude = columnNotEncludedClient
      break
    case 'role':
      columnNotInclude = columnNotEncludedRole
      break
    case 'group':
      columnNotInclude = columnNotEncludedGroup
      break
  }
  const onChange = (e: any, key: string) => {
    switch (isWhat) {
      case 'post':
        e ? dispatch(removeFromNotIncludesPost(key)) : dispatch(addedToNotIcludesPost(key))
        break
      case 'client':
        e ? dispatch(removeFromNotIncludesClient(key)) : dispatch(addedToNotIcludesClient(key))
        break
      case 'role':
        e ? dispatch(removeFromNotIncludesRole(key)) : dispatch(addedToNotIcludesRole(key))
        break
      case 'group':
        e ? dispatch(removeFromNotIncludesGroup(key)) : dispatch(addedToNotIcludesGroup(key))
        break
    }
  }
  if (!firstObj) {
    return null
  }
  return (
    <div className="toggle-column-container">
      {keysArray.map((key, i) => {
        return (
          <nav key={i}>
            <Switch onChange={(e) => onChange(e, key)} checked={!columnNotInclude.includes(key)} />
            <pre>{key.charAt(0).toUpperCase() + key.slice(1)}</pre>
          </nav>
        )
      })}
    </div>
  )
}

export default ToggleColumn
