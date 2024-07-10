import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useEffect, useState } from 'react'
import TableData from '@components/TableData/TableData'

import DrawerComp from '@components/Drawer/Drawer'

import ImageInfo from '@src/components/ImageInfo/ImageInfo'
import { fetchImages } from '@src/store/slices/images/imageThunk'
import ImageTableData from '@src/components/ImageTableData/TableData'

const Image = () => {
  const dispatch = useAppDispatch()
  const [_toggleFilter, setToggleFilter] = useState(false)
  const [toggleColumn, setToggleColumn] = useState(false)

  useEffect(() => {
    dispatch(fetchImages())
  }, [])

  const { images } = useSelector((state: RootState) => state.images)

  return (
    <div className="client-container">
      <div className="client-data">
        <ImageInfo
          setToggleFilter={setToggleFilter}
          setToggleColumn={setToggleColumn}
          title={'Images List'}
          itemsNumber={images.length || 0}
          isUserListInfo={true}
        />
        <ImageTableData data={images} />
      </div>

      <DrawerComp />
    </div>
  )
}

export default Image
