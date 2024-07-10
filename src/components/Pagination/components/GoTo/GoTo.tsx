import { HiArrowRight } from 'react-icons/hi'
import { useState } from 'react'
import { useAppDispatch } from '@store/index'
import { getRoles } from '@store/slices/role/roleThunk'
import {
  setCurrentPageToPagination,
  setItemsPerPageToPagination,
} from '@src/store/slices/sittingSlice/sittingSlice'
import { getAllClient } from '@store/slices/clientSlice/clientThunk'
import { message } from 'antd'
import { getAllPopup } from '@store/slices/popup/popupThunk'
import { getUsersOfOtherWebSite } from '@store/slices/sittingSlice/sittingThunk'
import { getGroups } from '@store/slices/group/groupThunk'
interface GoToProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  isUserTable: any
  postsPaginate: any
  itemsPerPage: number
  totalItems: number
  totalPages: number
  userOfClient?: any
  filtersParam: any
  clientUsersPerpage?: any
  postsPerPage?: any
  groupPaginate?: any
}
const GoTo = ({
  setCurrentPage,
  currentPage,
  isUserTable,
  itemsPerPage,
  totalPages,
  postsPaginate,
  userOfClient,
  filtersParam,
  clientUsersPerpage,
  postsPerPage,
  groupPaginate,
}: GoToProps) => {
  const [value, setValue] = useState(currentPage)
  const dispatch = useAppDispatch()
  const handleGoTo = () => {
    if (value > totalPages || value < 1) {
      return message.error('page not found')
    }
    setCurrentPage(value)
    if (postsPaginate) {
      dispatch(
        getAllPopup({ page: value, pageSize: postsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    } else if (isUserTable) {
      dispatch(
        getAllClient({ page: value, pageSize: itemsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    } else if (groupPaginate) {
      dispatch(
        getGroups({ page: value, pageSize: itemsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    } else if (userOfClient) {
      dispatch(getUsersOfOtherWebSite({ page: value, pageSize: clientUsersPerpage, filtersParam }))
    } else {
      dispatch(
        getRoles({ page: value, pageSize: itemsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    }
    dispatch(setCurrentPageToPagination(value))
    dispatch(setItemsPerPageToPagination(itemsPerPage))
  }
  return (
    <div className="pagination-go-to">
      <span>Go to</span>
      <input value={value} onChange={(e) => setValue(Number(e.target.value))} type="number" />
      <HiArrowRight onClick={() => handleGoTo()} />
    </div>
  )
}

export default GoTo
