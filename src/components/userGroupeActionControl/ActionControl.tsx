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
  const handleView = async (userId: string) => {
    setDrawerVisible(true)
  }
  const actions = [
    { id: 1, icon: <BiEditAlt />, handler: handleUpdate },
    { id: 2, icon: <AiOutlineDelete />, handler: handleRemove },
    { id: 3, icon: <AiOutlineEye />, handler: handleView },
  ]
  return (
    <Space wrap>
      <div className="action-popup">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={() => {
              action.handler(id)
            }}
            className="action-popup-button"
          >
            {action.icon}
          </Button>
        ))}
      </div>

      <EditGroupeForm id={id} visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </Space>
  )
}

export default UserGroupeActionControl
