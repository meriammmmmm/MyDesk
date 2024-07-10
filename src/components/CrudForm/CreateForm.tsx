import React, { useEffect, useState } from 'react'
import InputField from '../InputField/InputField'
import SelectComp from '../SelectComp/SelectComp'
import { useAppDispatch, useAppSelector } from '../../store' // Use the custom hook
import { unwrapResult } from '@reduxjs/toolkit' // Import unwrapResult
import { addUser, fetchUsers } from '@src/store/slices/users/userThunk'
import Button from '../Button/Button'
import Switch from '@mui/material/Switch'
import { Upload } from '../UploadImage/UploadImage' // Import the Upload component
import { fetchImages } from '@src/store/slices/images/imageThunk'

import { message } from 'antd'
// Define the FileWithPreview type
type FileWithPreview = File & {
  preview?: string
}

const CreateForm = ({ onClosePopup }: { onClosePopup: () => void }) => {
  const dispatch = useAppDispatch()
  const { images } = useAppSelector((state) => state.images)
  const { users } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchImages())
    dispatch(fetchUsers())
  }, [dispatch])

  const useroptions: any[] = users.map((el: any) => ({
    label: `${el.name}`,
    value: `${el.name}`,
    image: `${el.image}`,
  }))

  const options: any[] = images.map((el: any) => ({
    label: `${el.name}`,
    value: `${el.name}`,
    image: `${el.image}`,
  }))

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fullname: '',
    password: '',
    userGroupe: [],
    iimageGroupe: [],
    image: null as FileWithPreview | null,
    status: true,
  })

  const handleFormChange = (newValues: any) => {
    setFormData(newValues)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    handleFormChange({ ...formData, [name]: value })
  }

  const handleImageUpload = (files: FileWithPreview[]) => {
    if (files.length > 0) {
      setFormData({ ...formData, image: files[0] })
    }
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, status: e.target.checked })
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(addUser(formData))
      unwrapResult(resultAction)
      message.success('user created succsfully')
      onClosePopup()
      dispatch(fetchUsers())
    } catch (error) {
      console.error('Failed to create user:', error)
      alert('Failed to create user. Please try again.')
    }
  }

  return (
    <div>
      <Upload onDrop={handleImageUpload} maxFiles={1} />

      <div className="create-container">
        <InputField
          field={{
            name: 'name',
            type: 'text',
            placeholder: 'Enter your name',
            label: 'Name',
            class: 'crud-form-field',
            redStar: '*',
          }}
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          field={{
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            label: 'Password',
            redStar: '*',
            class: 'crud-form-field',
          }}
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="create-container">
        <InputField
          field={{
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            label: 'Email',
            redStar: '*',
            class: 'crud-form-field',
          }}
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          field={{
            name: 'fullname',
            type: 'text',
            placeholder: 'Enter your full name',
            label: 'Full Name',
            redStar: '*',
            class: 'crud-form-field',
          }}
          value={formData.fullname}
          onChange={handleChange}
        />
      </div>
      <SelectComp
        options={options}
        label="Assign to a user group"
        value={formData.userGroupe}
        setValue={(value: any) => handleFormChange({ ...formData, userGroupe: value })}
      />
      <SelectComp
        options={useroptions}
        label="Assign to an image group"
        value={formData.iimageGroupe}
        setValue={(value: any) => handleFormChange({ ...formData, iimageGroupe: value })}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
          <Switch {...label} checked={formData.status} onChange={handleSwitchChange} />
          <p className="statusFormat">{formData.status ? 'Active' : 'Inactive'}</p>{' '}
          {/* Conditionally render the label */}
        </div>
        <p className="user-acount-status"> User Account Status</p>{' '}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          type="submit"
          style={{
            width: '26%',
            fontSize: '17px',
            marginTop: '30px',
            backgroundColor: '#0188F7',
          }}
          size="xl"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          type="button"
          style={{
            width: '26%',
            fontSize: '17px',
            marginTop: '30px',
            color: '#0188F7',
            border: '1px solid #0188F7',
            backgroundColor: 'white',
          }}
          onClick={() => {
            onClosePopup()
            setFormData({
              name: '',
              email: '',
              fullname: '',
              password: '',
              userGroupe: [],
              iimageGroupe: [],
              image: null,
              status: true,
            })
          }}
          size="xl"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default CreateForm
