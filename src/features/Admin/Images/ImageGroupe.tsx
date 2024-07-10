import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useEffect, useState } from 'react'

import DrawerComp from '@components/Drawer/Drawer'

import GroupeListInfo from '@src/components/GroupeListInfo/GroupeListInfo'
import GroupeData from '@src/components/TableData/GroupeTbale/GroupeTable'

import { fetchUserGroupe } from '@src/store/slices/userGroupe/userGroupeThunk'
import { fetchImageGroupe } from '@src/store/slices/imageGroupe/imageGroupeThunk'
import GroupeTable from '@src/components/ImageTableData/ImageGroupeTable'
import ImageGroupe from '@src/components/GroupeListInfo/ImageGroupe'

const User = () => {
  const dispatch = useAppDispatch()
  const [_toggleFilter, setToggleFilter] = useState(false)
  const [toggleColumn, setToggleColumn] = useState(false)

  useEffect(() => {
    dispatch(fetchImageGroupe())
  }, [])

  const { imageGroupes } = useSelector((state: RootState) => state.imagegroupes)

  return (
    <div className="client-container">
      <div className="client-data">
        <ImageGroupe
          setToggleFilter={setToggleFilter}
          setToggleColumn={setToggleColumn}
          title={'ImageGroupe List'}
          itemsNumber={imageGroupes.length || 0}
          isUserListInfo={true}
        />
        <GroupeTable data={imageGroupes} />
      </div>

      <DrawerComp />
    </div>
  )
}

export default User
