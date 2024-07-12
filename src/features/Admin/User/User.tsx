import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useEffect, useState } from 'react'
import TableData from '@components/TableData/TableData'
import ListInfo from '@components/ListInfo/ListInfo'
import CrudForm from '@components/CrudForm/CrudForm'
import DrawerComp from '@components/Drawer/Drawer'
import ToggleColumn from '@src/components/ToggleColumn/ToggleColumn'
import { fetchUsers } from '@src/store/slices/users/userThunk'

const User = () => {
  const dispatch = useAppDispatch()
  const [_toggleFilter, setToggleFilter] = useState(false)
  const [toggleColumn, setToggleColumn] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const { users } = useSelector((state: RootState) => state.users)

  return (
    <div className="client-container">
      <div className="client-data">
        <ListInfo
          setToggleFilter={setToggleFilter}
          setToggleColumn={setToggleColumn}
          title={'Users List'}
          itemsNumber={users.length || 0}
          isUserListInfo={true}
        />
        <TableData data={users} />
      </div>
    </div>
  )
}

export default User
