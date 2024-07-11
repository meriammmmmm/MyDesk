import React, { useEffect, useState } from 'react'
import { Space, Button, message } from 'antd'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import CrudForm from '../CrudForm/CrudForm'
import { fetchUserById, removeUser, fetchUsers } from '@src/store/slices/users/userThunk'
import { useAppDispatch, useAppSelector } from '@src/store'
import Swal from 'sweetalert2'

const ActionControl: React.FC<{
  id: string
}> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)
  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    fullname: '',
    organization: '',
    lastsession: '',
    status: 'Offline',
  })
  const { user } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUserById(id))
  }, [id])

  useEffect(() => {
    if (user) {
      setInitialValues({
        id: String(user.id || ''),
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        fullname: user.fullname || '',
        organization: user.organization || '',
        lastsession: user.lastsession || '',
        status: user.status ? 'Active' : 'Offline',
      })
    }
  }, [user])

  const handleUpdate = async (userId: string) => {
    setIsViewMode(false)
    setDrawerVisible(true)
    dispatch(fetchUserById(id))
  }

  const handleView = async (userId: string) => {
    setIsViewMode(true)
    setDrawerVisible(true)
    dispatch(fetchUserById(id))
  }

  const handleRemove = (userId: string) => {
    Swal.fire({
      title: 'Delete User',
      icon: 'warning',
      text: 'Are you sure you want to delete this user? This action cannot be undone.',
      showCloseButton: true,

      showCancelButton: true,
      confirmButtonColor: '#506bcc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(removeUser(userId)).unwrap()
        dispatch(fetchUsers())
        message.success('User deleted successfully')
      }
    })
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

      <CrudForm
        id={id}
        visible={drawerVisible}
        initialValues={initialValues}
        onClose={() => setDrawerVisible(false)}
        isViewMode={isViewMode}
      />
    </Space>
  )
}

export default ActionControl
