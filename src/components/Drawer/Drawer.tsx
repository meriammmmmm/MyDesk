import { Drawer } from 'antd'

import { useAppDispatch, RootState } from '@src/store/index'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import FormatTime from '../FormatTime/FormatTime'
import { useSelector } from 'react-redux'
import TagCom from '../TagCom/TagCom'

const DrawerComp = ({ isRole }: any) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Drawer title="Basic Drawer" placement="right" className="preview-user-container">
        <div className="main-crud-form-title">
          <p>Preview {isRole ? 'Role' : 'User'}</p>
          <AiOutlineCloseCircle className="close-icon" />
        </div>
        <div className="preview-user-filed-container">
          <div className="preview-user-filed">
            <label htmlFor="">_id</label>
          </div>
          <div className="preview-user-filed">
            <label htmlFor="">name</label>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerComp
