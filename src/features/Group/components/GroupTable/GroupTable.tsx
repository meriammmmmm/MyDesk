import Input from '@src/components/Input/Input'
import Pagination from '@components/Pagination/Pagination'
import Search from '@src/assets/icons/client/search.svg'
import { useAppDispatch } from '@store/index'
import { useEffect } from 'react'
import { getUsersOfOtherWebSite } from '@src/store/slices/sittingSlice/sittingThunk'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { useState } from 'react'
import { IoFilter } from 'react-icons/io5'
import Filter from '@src/components/Filter/Filter'
import AudienceTable from '@src/components/AudienceTable/AudienceTable'

import Button from '@src/components/Button/Button'
import SelectedItems from '../SelectedItems/SelectedItems'

const GroupTable = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { clientUsersPerpage } = useSelector((state: RootState) => state.sitting)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      getUsersOfOtherWebSite({
        page: 1,
        pageSize: clientUsersPerpage,
      }),
    )
  }, [])
  const { status, guestUsers, guestUsersNumber } = useSelector((state: RootState) => state.sitting)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }
  useEffect(() => {
    const delay = 500
    const id = setTimeout(() => {
      dispatch(
        getUsersOfOtherWebSite({
          page: 1,
          pageSize: clientUsersPerpage,
          name: searchValue,
        }),
      )
    }, delay)
    return () => {
      clearTimeout(id)
    }
  }, [searchValue, dispatch])

  return (
    <div className="guest-users-table">
      <div className="table-without-pagination">
        <div className="filter-search-guest-users">
          <Button onClick={() => setIsOpen((prev) => !prev)} className="filter-guest-users-btn">
            <IoFilter />
            <span>Filter</span>
          </Button>
          <Input
            className={'search-guest-users'}
            variant={'dark'}
            icon={Search}
            value={searchValue}
            onChange={handleSearch}
            placeholder={'Search By: id , name , lastName , email , phoneNumber'}
          />
        </div>
        {isOpen && <Filter />}
        <SelectedItems guestUsers={guestUsers} />
        <AudienceTable
          data={guestUsers}
          notIncluded={[
            'birth_date',
            'full_name',
            'country',
            'machine_id',
            'gender',
            'delegation',
            'institute',
            'business',
            'optional_subject',
            'o_id',
            'postal_code',
            'deleted_at',
            'instructor_prices',
            'external_teacher',
            'student_level_users',
            'instructor_subjects',
            'payment_agreements',
            'external_client',
            'points',
            'avatar',
            'updated_at',
          ]}
          loading={status}
          isUserTable={false}
          GuestUser={true}
        />
      </div>
      <Pagination totalItems={guestUsersNumber} itemsPerPage={5} userOfClient={true} />
      {/* {!audience && <div className="overlay-of-GuesTable"></div>} */}
    </div>
  )
}

export default GroupTable
