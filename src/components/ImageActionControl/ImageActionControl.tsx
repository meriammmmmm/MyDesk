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
  const [isViewMode, setIsViewMode] = useState(false)

  useEffect(() => {
    dispatch(fetchImageById(id))
  }, [id])
  const handleUpdate = async (userId: string) => {
    try {
      setIsViewMode(false)
      setDrawerVisible(true)
      dispatch(fetchImageById(id))
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
  const { image } = useAppSelector((state) => state.images)

  const handleView = async (userId: string) => {
    setIsViewMode(true)
    setDrawerVisible(true)
    dispatch(fetchImageById(id))
  }
  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    dockerImage: '',
    logoUrl: '',
    description: '',
    tag: [],
    status: 'Offline',
  })

  useEffect(() => {
    if (image) {
      setInitialValues({
        id: String(image.id || ''),
        name: image.name || '',
        dockerImage: image.dockerImage || '',
        logoUrl: image.logoUrl || '',
        description: image.description || '',
        tag: image.tag || [],
        status: image.status ? 'Active' : 'Offline',
      })
    }
  }, [image])
  const handleRemove = (imageId: string) => {
    Swal.fire({
      title: 'Delete Image',
      text: 'Are you sure you want to delete this user? This action cannot be undone.',
      icon: 'warning',
      showCloseButton: true,

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

      <ImageEdit
        initialValues={initialValues}
        isViewMode={isViewMode}
        id={id}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </Space>
  )
}

export default ImageActionControl
