import React, { useEffect, useState } from 'react'
import { Space, Button, message } from 'antd'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@src/store'
import Swal from 'sweetalert2'
import { fetchUserGroupeById } from '@src/store/slices/userGroupe/userGroupeThunk'
import {
  fetchImageGroupe,
  fetchImageGroupeById,
  removeImageGrouper,
} from '@src/store/slices/imageGroupe/imageGroupeThunk'
import EditGroupeForm from '../CrudForm/EditImageGroupeForm'

const ImageGroupeActionControl: React.FC<{
  id: string
}> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)

  useEffect(() => {
    dispatch(fetchImageGroupeById(id))
  }, [id, dispatch])

  const handleUpdate = () => {
    setIsViewMode(false)

    setDrawerVisible(true)
    dispatch(fetchImageGroupeById(id))
  }

  const handleRemove = (userGroupeId: string) => {
    Swal.fire({
      title: 'Delete Image Groupe',
      text: 'Are you sure you want to delete this user? This action cannot be undone.',
      icon: 'warning',
      showCloseButton: true,

      showCancelButton: true,
      confirmButtonColor: '#506bcc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(removeImageGrouper(userGroupeId)).unwrap()
        dispatch(fetchImageGroupe())
        message.success('image Groupe deleted succfully ')
      }
    })
  }
  const handleView = async (userId: string) => {
    setIsViewMode(true)

    setDrawerVisible(true)
    dispatch(fetchUserGroupeById(id))
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
      <EditGroupeForm
        isViewMode={isViewMode}
        id={id}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </Space>
  )
}

export default ImageGroupeActionControl
