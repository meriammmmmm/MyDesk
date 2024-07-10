import React, { useEffect, useState } from 'react'
import { Space, Button, message } from 'antd'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@src/store'
import Swal from 'sweetalert2'
import {
  fetchUserGroupe,
  fetchUserGroupeById,
  removeUserGrouper,
} from '@src/store/slices/userGroupe/userGroupeThunk'
import EditGroupeForm from '../CrudForm/EditGroupeForm'

const UserGroupeActionControl: React.FC<{
  id: string
}> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchUserGroupeById(id))
  }, [id, dispatch])

  const handleUpdate = () => {
    setDrawerVisible(true)
    dispatch(fetchUserGroupeById(id))
  }

  const { userGroupe } = useAppSelector((state) => state.usergroupes)

  const handleRemove = (userGroupeId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#506bcc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(removeUserGrouper(userGroupeId)).unwrap()
        dispatch(fetchUserGroupe())
        message.success('user deleted succfully ')
      }
    })
  }

  return (
    <Space wrap>
      <div className="action-popup">
        <Button onClick={handleUpdate} className="action-popup-button">
          <BiEditAlt />
        </Button>

        <Button onClick={() => handleRemove(id)} className="action-popup-button">
          <AiOutlineDelete />
        </Button>

        <Button onClick={() => {}} className="action-popup-button">
          <AiOutlineEye />
        </Button>
      </div>

      <EditGroupeForm id={id} visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </Space>
  )
}

export default UserGroupeActionControl
