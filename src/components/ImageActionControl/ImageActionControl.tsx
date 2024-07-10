import React, { useEffect, useState } from 'react'
import { Space, Button, message } from 'antd'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import CrudForm from '../CrudForm/CrudForm'
import { fetchUserById, removeUser } from '@src/store/slices/users/userThunk'
import { useAppDispatch, useAppSelector } from '@src/store'
import Swal from 'sweetalert2'
import { fetchImageById, fetchImages, removeImage } from '@src/store/slices/images/imageThunk'
import ImageEdit from '../CrudForm/ImageEdit'

const ImageActionControl: React.FC<{
  id: string
}> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [drawerVisible, setDrawerVisible] = useState(false)
  useEffect(() => {
    dispatch(fetchImageById(id))
  }, [id])
  const handleUpdate = async (userId: string) => {
    try {
      // dispatch(fetchUserById(userId))
      setDrawerVisible(true)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
  const { image } = useAppSelector((state) => state.images)
  console.log(image)

  const handleView = async (userId: string) => {
    // Your existing view logic
  }
  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    fullname: '',
    organization: '',
    lastsession: '',
    last_login_time: '',
    status: 'Offline',
  })

  useEffect(() => {
    if (image) {
      setInitialValues({
        id: String(image.id || ''),
        name: image.name || '',
        email: image.email || '',
        password: '',
        fullname: image.fullname || '',
        organization: image.organization || '',
        lastsession: image.lastsession || '',
        last_login_time: image.last_login_time || '',
        status: image.status ? 'Active' : 'Offline',
      })
    }
  }, [image])
  const handleRemove = (imageId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#506bcc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      await dispatch(removeImage(imageId)).unwrap()
      dispatch(fetchImages())
      message.success('image deleted succfully ')
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

      <ImageEdit id={id} visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </Space>
  )
}

export default ImageActionControl
