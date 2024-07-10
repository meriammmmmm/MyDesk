import {
  setCurrentPageToPagination,
  setItemsPerPageToPagination,
} from '@src/store/slices/sittingSlice/sittingSlice'
import React, { useState } from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { useAppDispatch } from '@store/index'
import { getAllClient } from '@store/slices/clientSlice/clientThunk'
import { getRoles } from '@store/slices/role/roleThunk'
import GoTo from './components/GoTo/GoTo'
import { getAllPopup } from '@src/store/slices/popup/popupThunk'
import { getUsersOfOtherWebSite } from '@store/slices/sittingSlice/sittingThunk'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import PerPage from './components/PerPage/PerPage'
import { getGroups } from '@store/slices/group/groupThunk'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  isUserTable?: boolean
  postsPaginate?: boolean
  userOfClient?: boolean
  groupPaginate?: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  isUserTable,
  postsPaginate,
  userOfClient,
  groupPaginate,
}) => {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { clientUsersPerpage, postsPerPage, usersPerPage, groupsPerPage } = useSelector(
    (state: RootState) => state.sitting,
  )
  let totalPages: number

  if (userOfClient) {
    totalPages = Math.ceil(totalItems / clientUsersPerpage)
  } else if (postsPaginate) {
    totalPages = Math.ceil(totalItems / postsPerPage)
  } else if (groupPaginate) {
    totalPages = Math.ceil(totalItems / groupsPerPage)
  } else if (isUserTable) {
    totalPages = Math.ceil(totalItems / usersPerPage)
  } else {
    totalPages = Math.ceil(totalItems / itemsPerPage)
  }
  const { filtersParam } = useSelector((state: RootState) => state.clientFilter)
  const handleNavigatePage = (isDiff: string) => {
    setCurrentPage((prevPage) =>
      Math.min(isDiff === 'next' ? prevPage + 1 : prevPage - 1, totalPages),
    )
    if (postsPaginate) {
      dispatch(
        getAllPopup({
          page: isDiff === 'next' ? currentPage + 1 : currentPage - 1,
          pageSize: postsPerPage,
          orderBy: 'createdAt',
          order: 'desc',
        }),
      )
    } else if (isUserTable) {
      dispatch(
        getAllClient({
          page: isDiff === 'next' ? currentPage + 1 : currentPage - 1,
          pageSize: usersPerPage,
          orderBy: 'createdAt',
          order: 'desc',
        }),
      )
    } else if (groupPaginate) {
      dispatch(
        getGroups({
          page: isDiff === 'next' ? currentPage + 1 : currentPage - 1,
          pageSize: groupsPerPage,
          orderBy: 'createdAt',
          order: 'desc',
        }),
      )
    } else if (userOfClient) {
      dispatch(
        getUsersOfOtherWebSite({
          page: isDiff === 'next' ? currentPage + 1 : currentPage - 1,
          pageSize: clientUsersPerpage,
          filtersParam,
        }),
      )
    } else {
      dispatch(
        getRoles({
          page: isDiff === 'next' ? currentPage + 1 : currentPage - 1,
          pageSize: itemsPerPage,
          orderBy: 'createdAt',
          order: 'desc',
        }),
      )
    }
    dispatch(setCurrentPageToPagination(isDiff === 'next' ? currentPage + 1 : currentPage - 1))
    dispatch(setItemsPerPageToPagination(itemsPerPage))
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (postsPaginate) {
      dispatch(
        getAllPopup({ page: page, pageSize: postsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    } else if (isUserTable) {
      dispatch(
        getAllClient({ page: page, pageSize: usersPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    } else if (groupPaginate) {
      dispatch(
        getGroups({ page: page, pageSize: groupsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    } else if (userOfClient) {
      dispatch(getUsersOfOtherWebSite({ page: page, pageSize: clientUsersPerpage, filtersParam }))
    } else {
      dispatch(
        getRoles({ page: page, pageSize: itemsPerPage, orderBy: 'createdAt', order: 'desc' }),
      )
    }
    dispatch(setCurrentPageToPagination(page))
    dispatch(setItemsPerPageToPagination(itemsPerPage))
  }
  const formatPageNumber = (pageNumber: number) => {
    return pageNumber < 10 ? `0${pageNumber}` : `${pageNumber}`
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPageButtons = 6 // Maximum number of visible page buttons
    const numPagesToShow = Math.min(maxPageButtons, totalPages)

    const getPageButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        onClick={() => {
          pageNumber !== currentPage && handlePageChange(pageNumber)
        }}
        className={`pagination-button ${currentPage === pageNumber && 'pagination-button-active'}`}
      >
        {formatPageNumber(pageNumber)}
      </button>
    )

    if (totalPages <= maxPageButtons) {
      // Display all page buttons if there are 6 or fewer pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(getPageButton(i))
      }
    } else {
      // Display first 3 pages, ellipsis, last 3 pages
      if (currentPage <= 3) {
        for (let i = 1; i <= numPagesToShow - 1; i++) {
          pageNumbers.push(getPageButton(i))
        }
        pageNumbers.push(
          <span key="ellipsis-start" className="pagination-button">
            ...
          </span>,
        )
        pageNumbers.push(getPageButton(totalPages))
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(getPageButton(1))
        pageNumbers.push(
          <span key="ellipsis-end" className="pagination-button">
            ...
          </span>,
        )
        for (let i = totalPages - (numPagesToShow - 2); i <= totalPages; i++) {
          pageNumbers.push(getPageButton(i))
        }
      } else {
        pageNumbers.push(getPageButton(1))
        pageNumbers.push(
          <span key="ellipsis-start" className="pagination-button">
            ...
          </span>,
        )
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(getPageButton(i))
        }
        pageNumbers.push(
          <button key="ellipsis-end" className="pagination-button">
            ...
          </button>,
        )
        pageNumbers.push(getPageButton(totalPages))
      }
    }

    return pageNumbers
  }
  return (
    <div className="pagination-container">
      <MdOutlineKeyboardDoubleArrowLeft
        onClick={() => handlePageChange(1)}
        className="arrow-first-item"
      />
      <div className="sub-pagination">
        <button
          className="prev-next-btns prev-btn"
          onClick={() => handleNavigatePage('prev')}
          disabled={currentPage === 1}
        >
          <BsArrowLeftShort />
          <p>Previous</p>
        </button>
        <div className="pagination-button-page-number">{renderPageNumbers()}</div>
        <button
          className="prev-next-btns next-btn"
          onClick={() => handleNavigatePage('next')}
          disabled={currentPage === totalPages}
        >
          <p>Next</p>
          <BsArrowRightShort />
        </button>
      </div>
      <MdOutlineKeyboardDoubleArrowRight
        onClick={() => handlePageChange(totalPages)}
        className="arrow-last-item"
      />

      {userOfClient && <PerPage userOfClient={userOfClient} filtersParam={filtersParam} />}
      {postsPaginate && <PerPage postsPaginate={postsPaginate} />}
      {isUserTable && <PerPage isUserTable={isUserTable} />}
      {groupPaginate && <PerPage groupPaginate={groupPaginate} />}
      <GoTo
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        isUserTable={isUserTable}
        userOfClient={userOfClient}
        postsPaginate={postsPaginate}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        filtersParam={filtersParam}
        clientUsersPerpage={clientUsersPerpage}
        postsPerPage={postsPerPage}
        groupPaginate={groupPaginate}
      />
    </div>
  )
}

export default Pagination
