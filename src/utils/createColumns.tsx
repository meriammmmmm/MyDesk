import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import { addedToGroupsToDelete, removeFromGroupsToDelete } from '@src/store/slices/group/groupSlice'
import {
  addedItemToRemove,
  checkedPosts,
  removeItemFromRemove,
} from '@src/store/slices/post/postSlice'

export const generateColumns = (
  data: any,
  exceptions?: string[],
  _isUser?: boolean,
  GuestUser?: any,
  posts?: any,
  group?: any,
  dispatch?: any,
) => {
  const { isCheckedPosts } = useSelector((state: RootState) => state.post)

  if (!data || data.length === 0) {
    return []
  }
  const onChange = (e: CheckboxChangeEvent) => {
    dispatch(checkedPosts(!isCheckedPosts))
    data?.map((el: any) => {
      if (posts) {
        e.target.checked
          ? dispatch(addedItemToRemove({ id: el?._id }))
          : dispatch(removeItemFromRemove({ id: el?._id }))
      } else if (group) {
        e.target.checked
          ? dispatch(addedToGroupsToDelete({ id: el?._id }))
          : dispatch(removeFromGroupsToDelete({ id: el?._id }))
      }
    })
  }

  let fields = Object.keys(data[0])
  let columns: any = fields
    .map((field, i) => {
      if (GuestUser) {
        if (
          exceptions &&
          !exceptions.includes(field) &&
          ['number', 'object', 'string'].includes(typeof data[0][field])
        ) {
          return {
            title: field,
            dataIndex: field,
            key: field,
            className: `table-column-field table-column-field-${i}`,
          }
        }
      } else {
        if (exceptions && !exceptions.includes(field)) {
          return {
            title: field === 'author' ? 'sender' : field,
            dataIndex: field === 'author' ? 'sender' : field,
            key: field === 'author' ? 'sender' : field,
            className: `table-column-field table-column-field-${i}`,
          }
        }
      }
    })
    .filter((column) => column !== undefined && column?.title !== 'title')
  if (!GuestUser) {
    columns.push({
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      className: 'table-column-field action-field',
    })
  }
  GuestUser &&
    columns.unshift({
      // title: <Checkbox>All</Checkbox>,
      dataIndex: 'select',
      key: 'select',
    })
  if (posts || group) {
    columns.unshift({
      dataIndex: 'multipleDelete',
      key: 'multipleDelete',
    })
  }

  return columns
}
