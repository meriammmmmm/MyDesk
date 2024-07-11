import React, { useEffect, FC } from 'react'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/system'
import low from '../../../../assets/images/low.png'
import high from '../../../../assets/images/high.png'
import medium from '../../../../assets/images/medium.png'
import cpu from '../../../../assets/icons/cpu.svg'
import cpu1 from '../../../../assets/icons/cpu1.svg'
import disk from '../../../../assets/icons/disk.svg'
import ram from '../../../../assets/icons/ram.svg'
import { useAppDispatch } from '@src/store'
import { fetchImages, editImages } from '@src/store/slices/images/imageThunk' // Import editImages
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import ConfigurationCard from './ConfigurationCard' // Adjust the import path as needed
import SliderComponent from './SliderComponent' // Adjust the import path as needed

interface ModalProps {
  selectedTool: any
  selectedCardIndex: number | null
  switchOn: boolean
  cpuValue: number
  ramValue: number
  diskValue: number
  handleClose: () => void
  handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCardClick: (index: number) => void
  handleCpuChange: (event: Event, newValue: number | number[]) => void
  handleRamChange: (event: Event, newValue: number | number[]) => void
  handleDiskChange: (event: Event, newValue: number | number[]) => void
  handleSubmit: () => void
  imageId: string // Assuming the id is passed as a prop
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#fff',
    '&.Mui-checked': {
      color: 'white !important',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#2196f3',
    },
  },
}))

const marks = {
  cpu: [
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
  ],
  disk: [
    { value: 16, label: '16' },
    { value: 32, label: '32' },
    { value: 64, label: '64' },
    { value: 120, label: '120' },
    { value: 256, label: '256' },
    { value: 512, label: '512' },
  ],
  ram: [
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
    { value: 16, label: '16' },
    { value: 32, label: '32' },
  ],
}

const configs = [
  { label: 'low', cpu: 2, disk: 16, ram: 2, img: low },
  { label: 'medium', cpu: 4, disk: 64, ram: 8, img: medium },
  { label: 'high', cpu: 8, disk: 512, ram: 32, img: high },
]

const Modal: FC<ModalProps> = ({
  selectedTool,
  selectedCardIndex,
  switchOn,
  cpuValue,
  ramValue,
  diskValue,
  handleClose,
  handleSwitchChange,
  handleCardClick,
  handleCpuChange,
  handleRamChange,
  handleDiskChange,
  handleSubmit,
  imageId, // Added imageId as a prop
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const onSubmit = () => {
    const payload = {
      newImagesData: {
        cpu: cpuValue,
        diskSize: diskValue,
        ramSize: ramValue,
      },
      id: imageId,
    }

    dispatch(editImages(payload))
    handleSubmit()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <div className="model-content-header">
            <div>
              <h2>Configuring desktop {selectedTool.name}</h2>
              <p>Start to config your desktop</p>
            </div>
            <img style={{ width: '4rem' }} src={selectedTool.image} alt={selectedTool.name} />
          </div>
        </div>
        <div className={`configuration-cards ${switchOn ? '' : 'disabled'}`}>
          {configs.map((config, index) => (
            <ConfigurationCard
              key={index}
              config={config}
              index={index}
              selectedCardIndex={selectedCardIndex}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
        <div className="personalise">
          <p>Or personalise</p>
          <span className="line"></span>
          <CustomSwitch checked={switchOn} onChange={handleSwitchChange} />
        </div>
        <SliderComponent
          icon={cpu1}
          title="Number of Cores (CPU)"
          value={cpuValue}
          onChange={handleCpuChange}
          marks={marks.cpu}
          min={2}
          max={12}
          disabled={switchOn}
        />
        <SliderComponent
          icon={disk}
          title="Disk Size (GB)"
          value={diskValue}
          onChange={handleDiskChange}
          marks={marks.disk}
          min={16}
          max={512}
          disabled={switchOn}
        />
        <SliderComponent
          icon={ram}
          title="Ram Size (GB)"
          value={ramValue}
          onChange={handleRamChange}
          marks={marks.ram}
          min={2}
          max={32}
          disabled={switchOn}
        />

        <div
          style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            type="submit"
            style={{
              width: '26%',
              fontSize: '17px',
              marginTop: '30px',
              backgroundColor: '#0188F7',
              color: 'white',
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
            className="cancel-button-modal"
            size="xl"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
