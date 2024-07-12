import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '@src/store/index'
import Button from '@src/components/Button/Button'
import Input from '@src/components/Input/Input'
import useWindowSize from '../../hook/useWindowSize'
import Search from '@src/assets/icons/client/search.svg'
import CretePopUp from '../CretePopUp/CretePopUp'
import { fetchUsers } from '@src/store/slices/users/userThunk'

interface ListInfoProp {
  title: string
  itemsNumber: number | undefined
  isUserListInfo: boolean
  setToggleFilter: Dispatch<SetStateAction<boolean>>
  setToggleColumn: Dispatch<SetStateAction<boolean>>
}

const ListInfo = ({ setToggleColumn, title, itemsNumber, isUserListInfo }: ListInfoProp) => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const { width } = useWindowSize()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  useEffect(() => {
    const delay = 500
    const id = setTimeout(() => {
      dispatch(fetchUsers())
    }, delay)
    return () => {
      clearTimeout(id)
    }
  }, [searchValue, isUserListInfo, dispatch])

  const handleAdd = () => {
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <div className="client-list-info">
        <div className="main-title">
          <h1>{title}</h1>
          <p>{itemsNumber || 0} users</p>
        </div>
        <div className="admin-user-creation">
          <div className="admin-user-creation-search">
            <Input
              className="admin-user-search-input"
              icon={Search}
              value={searchValue}
              onChange={handleSearch}
              placeholder={'Search...'}
            />
          </div>
          <Button className={`admin-user-creation-btn`} onClick={() => handleAdd()}>
            {width < 600 ? '+' : isUserListInfo ? '+Add User' : 'Create Role'}
          </Button>
        </div>
      </div>

      {showPopup && <CretePopUp onClose={closePopup} />}
    </>
  )
}

export default ListInfo
