import React, { useEffect, useState } from 'react'
import { Space, Button, message } from 'antd'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@src/store'
import Swal from 'sweetalert2'
import { fetchUserGroupeById } from '@src/store/slices/userGroupe/userGroupeThunk'
import EditGroupeForm from '../CrudForm/EditGroupeForm'
import {
  fetchImageGroupe,
  removeImageGrouper,
} from '@src/store/slices/imageGroupe/imageGroupeThunk'

const ImageGroupeActionControl: React.FC<{
  id: string
}> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchUserGroupeById(id))
  }, [id, dispatch])

  const handleUpdate = () => {
    setDrawerVisible(true)
  }

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
        await dispatch(removeImageGrouper(userGroupeId)).unwrap()
        dispatch(fetchImageGroupe())
        message.success('image Groupe deleted succfully ')
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

export default ImageGroupeActionControl