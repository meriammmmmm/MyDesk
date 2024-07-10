import TableData from '@src/components/TableData/TableData'
import ListInfo from '@src/components/ListInfo/ListInfo'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useEffect, useState } from 'react'
import { getRoles } from '@store/slices/role/roleThunk'
import DrawerComp from '@src/components/Drawer/Drawer'
import ToggleColumn from '@src/components/ToggleColumn/ToggleColumn'

const Role = () => {
  const dispatch = useAppDispatch()
  const { currentPage, itemsPerPage } = useSelector((state: RootState) => state.sitting)
  const { roles, status, columnNotEncludedRole } = useSelector((state: RootState) => state.role)

  const [_toggleFilter, setToggleFilter] = useState(false)
  const [toggleColumn, setToggleColumn] = useState(false)
  useEffect(() => {
    dispatch(
      getRoles({ page: currentPage, pageSize: itemsPerPage, orderBy: 'createdAt', order: 'desc' }),
    )
  }, [])
  return (
    <div className="role-container">
      <div className="role-data">
        <ListInfo
          setToggleFilter={setToggleFilter}
          setToggleColumn={setToggleColumn}
          title={'Roles List'}
          itemsNumber={roles?.length}
          isUserListInfo={false}
        />
        {toggleColumn && <ToggleColumn isWhat={'role'} firstObj={roles ? roles[0] : null} />}

        {/* {toggleFilter && <p>hello filter</p>} */}
        <TableData
          data={roles}
          notIncluded={columnNotEncludedRole}
          loading={status}
          isUserTable={false}
        />
      </div>
      <DrawerComp isRole={true} />
      {/* <Pagination isUserTable={false} totalItems={length} itemsPerPage={5} /> */}
    </div>
  )
}

export default Role
