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
    setDrawerVisible(true)
    dispatch(fetchUserById(id))
  }

  const handleView = async (userId: string) => {
    // Implement your view logic here
  }

  const handleRemove = (userId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#506bcc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(removeUser(userId)).unwrap()
        dispatch(fetchUsers())
        message.success('user deleted succfully ')
      }
    })
  }

  return (
    <Space wrap>
      <div className="action-popup">
        <Button
          onClick={() => {
            handleUpdate(id)
          }}
          className="action-popup-button"
        >
          <BiEditAlt />
        </Button>

        <Button
          onClick={() => {
            handleRemove(id)
          }}
          className="action-popup-button"
        >
          <AiOutlineDelete />
        </Button>

        <Button
          onClick={() => {
            handleView(id)
          }}
          className="action-popup-button"
        >
          <AiOutlineEye />
        </Button>
      </div>

      <CrudForm
        id={id}
        visible={drawerVisible}
        initialValues={initialValues}
        onClose={() => setDrawerVisible(false)}
      />
    </Space>
  )
}

export default ActionControl