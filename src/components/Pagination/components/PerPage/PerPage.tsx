import {
  handleClientusersPerPage,
  handleGroupsPerPage,
  handlePostsPerPage,
  handleUsersPerPage,
} from '@src/store/slices/sittingSlice/sittingSlice'
import { Select } from 'antd'
import { useAppDispatch } from '@store/index'
import { getUsersOfOtherWebSite } from '@store/slices/sittingSlice/sittingThunk'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { getAllPopup } from '@src/store/slices/popup/popupThunk'
import { getGroups } from '@src/store/slices/group/groupThunk'
import { getAllClient } from '@src/store/slices/clientSlice/clientThunk'
let perPageValue: string
const PerPage = ({
  userOfClient,
  postsPaginate,
  isUserTable,
  groupPaginate,
  filtersParam,
}: any) => {
  const dispatch = useAppDispatch()
  const pageSize = ['5', '10', '24', '48', '100']
  const { clientUsersPerpage, postsPerPage, groupsPerPage, usersPerPage } = useSelector(
    (state: RootState) => state.sitting,
  )

  const onPageSizeChange = (value: string) => {
    if (userOfClient) {
      dispatch(getUsersOfOtherWebSite({ page: 1, pageSize: Number(value), filtersParam }))
      dispatch(handleClientusersPerPage(Number(value)))
    } else if (postsPaginate) {
      dispatch(
        getAllPopup({ page: 1, pageSize: Number(value), orderBy: 'createdAt', order: 'desc' }),
      )
      dispatch(handlePostsPerPage(Number(value)))
    } else if (isUserTable) {
      dispatch(
        getAllClient({ page: 1, pageSize: Number(value), orderBy: 'createdAt', order: 'desc' }),
      )
      dispatch(handleUsersPerPage(Number(value)))
    } else if (groupPaginate) {
      dispatch(getGroups({ page: 1, pageSize: Number(value), orderBy: 'createdAt', order: 'desc' }))
      dispatch(handleGroupsPerPage(Number(value)))
    }
  }
  if (userOfClient) {
    perPageValue = String(clientUsersPerpage)
  } else if (postsPaginate) {
    perPageValue = String(postsPerPage)
  } else if (isUserTable) {
    perPageValue = String(usersPerPage)
  } else if (groupPaginate) {
    perPageValue = String(groupsPerPage)
  }
  return (
    <div className="per-page-contianer">
      <Select
        style={{ width: 100 }}
        size={'large'}
        value={perPageValue}
        onChange={onPageSizeChange}
        options={pageSize.map((city) => ({ label: city, value: city }))}
      />
    </div>
  )
}

export default PerPage
