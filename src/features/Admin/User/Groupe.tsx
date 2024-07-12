import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useEffect, useState } from 'react'

import DrawerComp from '@components/Drawer/Drawer'

import GroupeListInfo from '@src/components/GroupeListInfo/GroupeListInfo'
import GroupeData from '@src/components/TableData/GroupeTbale/GroupeTable'

import { fetchUserGroupe } from '@src/store/slices/userGroupe/userGroupeThunk'

const User = () => {
  const dispatch = useAppDispatch()
  const [_toggleFilter, setToggleFilter] = useState(false)
  const [toggleColumn, setToggleColumn] = useState(false)

  useEffect(() => {
    dispatch(fetchUserGroupe())
  }, [])

  const { userGroupes } = useSelector((state: RootState) => state.usergroupes)

  return (
    <div className="client-container">
      <div className="client-data">
        <GroupeListInfo
          setToggleFilter={setToggleFilter}
          setToggleColumn={setToggleColumn}
          title={'Groupe List'}
          itemsNumber={userGroupes.length || 0}
          isUserListInfo={true}
        />
        <GroupeData data={userGroupes} />
      </div>
    </div>
  )
}

export default User
