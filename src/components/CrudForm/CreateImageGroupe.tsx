import React, { useState } from 'react'
import InputField from '../InputField/InputField'
import { useAppDispatch, useAppSelector } from '../../store'
import { unwrapResult } from '@reduxjs/toolkit'
import { addImages } from '@src/store/slices/images/imageThunk'
import Button from '../Button/Button'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import cpu1 from '../../assets/icons/cpu1.svg'
import disk from '../../assets/icons/disk.svg'
import ram from '../../assets/icons/ram.svg'
import { Upload } from '../UploadImage/UploadImage'
import { addImageGroupe, fetchImageGroupe } from '@src/store/slices/imageGroupe/imageGroupeThunk'
import { message } from 'antd'
import SelectComp from '../SelectComp/SelectComp'
import SlectImageGroupe from '../SelectComp/SlectImageGroupe'

// Define the FileWithPreview type
type FileWithPreview = File & {
  preview?: string
}

const ImageCreateForm = ({ onClosePopup }: { onClosePopup: () => void }) => {
  const dispatch = useAppDispatch()

  // Data for tags dropdown
  const sectionsData = [
    { id: 1, label: 'Communication' },
    { id: 2, label: 'Desktop' },
    { id: 3, label: 'Games' },
    { id: 4, label: 'Office' },
    { id: 5, label: 'Multimedia' },
    { id: 6, label: 'Chat' },
    { id: 7, label: 'Privacy' },
  ]

  const tagOptions = sectionsData.map((el) => ({ index: el.id, label: el.label, value: el.label }))

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tag: [],
    imageGroupe: [],
    status: true,
  })

  const handleFormChange = (newValues: any) => {
    setFormData((prevData) => ({ ...prevData, ...newValues }))
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    handleFormChange({ [name]: value })
  }

  const handleSwitchChange = (e: { target: { checked: any } }) => {
    setFormData((prevData) => ({ ...prevData, status: e.target.checked }))
  }

  const { images } = useAppSelector((state) => state.images)
  const options: any[] = images?.map((el: any) => ({
    label: `${el.name}`,
    value: `${el.name}`,
    image: `${el.image}`,
  }))

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(addImageGroupe(formData))
      unwrapResult(resultAction)

      console.log(formData)

      message.success('Image Groupe created successfully')
      onClosePopup()
      dispatch(fetchImageGroupe())
    } catch (error) {
      console.error('Failed to create image:', error)
      alert('Failed to create image. Please try again.')
    }
  }

  return (
    <div>
      <div className="create-container">
        <InputField
          field={{
            name: 'name',
            type: 'text',
            placeholder: 'Enter image name',
            label: 'Name',
            class: 'crud-form-field',
            redStar: '*',
          }}
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <InputField
        field={{
          name: 'description',
          type: 'text',
          placeholder: 'Enter description',
          label: 'Description',
          redStar: '*',
          class: 'crud-form-field',
        }}
        value={formData.description}
        onChange={handleChange}
      />
      <SelectComp
        label="Assign to an image group"
        value={formData.tag}
        setValue={(value: any) => handleFormChange({ tag: value })}
        options={tagOptions}
      />
      <SlectImageGroupe
        options={options}
        label="Assign to an image group"
        value={formData.imageGroupe}
        setValue={(value: any) => handleFormChange({ imageGroupe: value })}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
          <Switch
            inputProps={{ 'aria-label': 'Switch demo' }}
            checked={formData.status}
            onChange={handleSwitchChange}
          />
          <p className="statusFormat">{formData.status ? 'Active' : 'Inactive'}</p>{' '}
        </div>
        <p className="user-acount-status"> User Account Status</p>{' '}
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          type="button"
          onClick={() => {
            onClosePopup()
          }}
          size="xl"
          className="cancel-button-form"
        >
          Cancel
        </Button>
        <Button className="submit-button-form" type="submit" size="xl" onClick={handleSubmit}>
          Confirm
        </Button>
      </div>{' '}
    </div>
  )
}

export default ImageCreateForm
