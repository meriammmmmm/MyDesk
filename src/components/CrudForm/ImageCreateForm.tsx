import { useState } from 'react'
import InputField from '../InputField/InputField'
import SelectComp from '../SelectComp/SelectComp'
import { useAppDispatch } from '../../store'
import { unwrapResult } from '@reduxjs/toolkit'
import { addImages, fetchImages } from '@src/store/slices/images/imageThunk'
import Button from '../Button/Button'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import cpu1 from '../../assets/icons/cpu1.svg'
import disk from '../../assets/icons/disk.svg'
import ram from '../../assets/icons/ram.svg'
import { Upload } from '../UploadImage/UploadImage'
import { message } from 'antd'

// Define the FileWithPreview type
type FileWithPreview = File & {
  preview?: string
}

const ImageCreateForm = ({ onClosePopup }: { onClosePopup: () => void }) => {
  const dispatch = useAppDispatch()

  const sectionsData = [
    { id: 1, label: 'Communication' },
    { id: 2, label: 'Desktop' },
    { id: 3, label: 'Games' },
    { id: 4, label: 'Office' },
    { id: 5, label: 'Multimedia' },
    { id: 6, label: 'Chat' },
    { id: 7, label: 'Privacy' },
  ]

  const tagOptions = sectionsData.map((el) => ({
    index: el.id,
    label: el.label,
    value: el.label,
  }))

  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    description: '',
    dockerImage: '',
    tag: [],
    image: null as FileWithPreview | null,
    statuss: true,
    cpu: 2,
    ramSize: 2,
    diskSize: 2,
  })

  const handleFormChange = (newValues: any) => {
    setFormData(newValues)
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    handleFormChange({ ...formData, [name]: value })
  }

  const handleSwitchChange = (e: { target: { checked: any } }) => {
    setFormData({ ...formData, statuss: e.target.checked })
  }

  const handleSliderChange = (name: string, value: number) => {
    handleFormChange({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(addImages(formData))
      unwrapResult(resultAction)

      setFormData({
        name: '',
        logoUrl: '',
        description: '',
        dockerImage: '',
        tag: [],
        image: null,
        statuss: true,
        cpu: 2,
        ramSize: 2,
        diskSize: 2,
      })

      message.success('user created succsfully')
      onClosePopup()
      dispatch(fetchImages())
    } catch (error) {
      message.success('user created succsfully')
      onClosePopup()
      dispatch(fetchImages())
    }
  }

  const handleImageUpload = (files: FileWithPreview[]) => {
    if (files.length > 0) {
      setFormData({ ...formData, image: files[0] })
    }
  }

  const marks = [
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
  ]

  const valuetext = (value: any) => {
    return `${value}`
  }

  return (
    <div>
      <Upload onDrop={handleImageUpload} maxFiles={1} />
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
        <InputField
          field={{
            type: 'text',
            name: 'dockerImage',
            placeholder: 'Enter Docker image',
            label: 'Docker Image',
            redStar: '*',
            class: 'crud-form-field',
          }}
          value={formData.dockerImage}
          onChange={handleChange}
        />
      </div>
      <InputField
        field={{
          type: 'text',
          name: 'logoUrl',
          placeholder: 'Enter logo URL',
          label: 'Logo URL',
          redStar: '*',
          class: 'crud-form-field',
        }}
        value={formData.logoUrl}
        onChange={handleChange}
      />
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
        options={tagOptions}
        label="Assign to an image group"
        value={formData.tag}
        setValue={(value: any) => handleFormChange({ ...formData, tag: value })}
      />
      <div className="personal-slider-container">
        <div className="personal-slider">
          <div className="title">
            <img src={cpu1} alt="CPU" />
            <p>Number of Cores (CPU)</p>
          </div>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Number of cores"
              value={formData.cpu}
              getAriaValueText={valuetext}
              step={2}
              marks={marks}
              valueLabelDisplay="on"
              min={2}
              max={12}
              onChange={(e, newValue: any) => handleSliderChange('cpu', newValue)}
            />
          </Box>
        </div>
        <p>{formData.cpu} CPU</p>
      </div>
      <div className="personal-slider-container">
        <div className="personal-slider">
          <div className="title">
            <img src={disk} alt="Disk" />
            <p>Disk Size (GB)</p>
          </div>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Disk Size"
              value={formData.diskSize}
              getAriaValueText={(value) => `${value} GB`}
              step={2}
              marks={marks}
              valueLabelDisplay="on"
              min={2}
              max={12}
              onChange={(e, newValue: any) => handleSliderChange('diskSize', newValue)}
            />
          </Box>
        </div>
        <p>{formData.diskSize} GB</p>
      </div>
      <div className="personal-slider-container">
        <div className="personal-slider">
          <div className="title">
            <img src={ram} alt="RAM" />
            <p>RAM Size (GB)</p>
          </div>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="RAM Size"
              value={formData.ramSize}
              getAriaValueText={(value) => `${value} GB`}
              step={2}
              marks={marks}
              valueLabelDisplay="on"
              min={2}
              max={12}
              onChange={(e, newValue: any) => handleSliderChange('ramSize', newValue)}
            />
          </Box>
        </div>
        <p>{formData.ramSize} GB</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
          <Switch
            inputProps={{ 'aria-label': 'Switch demo' }}
            checked={formData.statuss}
            onChange={handleSwitchChange}
          />
          <p className="statusFormat">{formData.statuss ? 'Active' : 'Inactive'}</p>{' '}
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
