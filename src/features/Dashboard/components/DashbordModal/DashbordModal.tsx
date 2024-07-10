import { useEffect, useState } from 'react'
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
import { fetchImages, editImages } from '@src/store/slices/images/imageThunk'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
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
const Modal: React.FC<ModalProps> = ({
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
}) => {
  const cpumarks = [
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
  ]
  const diskmarks = [
    { value: 16, label: '16' },
    { value: 32, label: '32' },
    { value: 64, label: '64' },
    { value: 120, label: '120' },
    { value: 256, label: '256' },

    { value: 512, label: '512' },
  ]
  const rammarks = [
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
    { value: 16, label: '16' },
    { value: 32, label: '32' },
  ]

  function valuetext(value: number) {
    return `${value} CPU`
  }

  const dispatch = useAppDispatch()
  const { images } = useSelector((state: any) => state.images)

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <div className="model-content-header">
            <div>
              {' '}
              <h2>Configuring desktop {selectedTool.name}</h2>
              <p>Start to config your desktop</p>
            </div>
            <img style={{ width: '4rem' }} src={selectedTool.image} alt="" />
          </div>
        </div>
        <div className={`configuration-cards ${switchOn ? '' : 'disabled'}`}>
          {['low', 'medium', 'high'].map((config, index) => (
            <div
              key={index}
              className={`configuration-cards-container ${
                selectedCardIndex === index ? 'selected' : ''
              }`}
              onClick={() => handleCardClick(index)}
            >
              <img
                src={config === 'low' ? low : config === 'medium' ? medium : high}
                alt=""
                className="configuration-image"
              />

              <div className="configuration-cards-details">
                <div className="configuration-details">
                  <img src={cpu} alt="" />
                  <p className="congfiguration-title">CPU</p>
                </div>
                <p className="configuration-number">
                  {config === 'low' ? '2' : config === 'medium' ? '4' : '8'} CPU
                </p>
              </div>
              <div className="configuration-cards-details">
                <div className="configuration-details">
                  <img src={disk} alt="" />
                  <p className="congfiguration-title">Disk Size</p>
                </div>
                <p className="configuration-number">
                  {config === 'low' ? '16' : config === 'medium' ? '64' : '512'} GB
                </p>
              </div>
              <div className="configuration-cards-details">
                <div className="configuration-details">
                  <img src={ram} alt="" />
                  <p className="congfiguration-title">Ram Size</p>
                </div>
                <p className="configuration-number">
                  {config === 'low' ? '2' : config === 'medium' ? '8' : '32'} GB
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="personalise">
          <p>Or personalise</p>
          <span className="line"></span>
          <CustomSwitch checked={switchOn} onChange={handleSwitchChange} />
        </div>
        <div className="personal-slider-container">
          <div className="personal-slider">
            <div className="title">
              <img src={cpu1} alt="" />
              <p>Number of Cores (CPU)</p>
            </div>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Number of cores"
                defaultValue={cpuValue}
                getAriaValueText={valuetext}
                step={2}
                marks={cpumarks}
                valueLabelDisplay="on"
                min={2}
                max={12}
                disabled={switchOn}
                onChange={handleCpuChange}
              />
            </Box>
          </div>
          <p className="personal-configuartion">{cpuValue} CPU</p>
        </div>
        <div className="personal-slider-container">
          <div className="personal-slider">
            <div className="title">
              <img src={disk} alt="" />
              <p>Disk Size (GB)</p>
            </div>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Disk Size"
                defaultValue={diskValue}
                getAriaValueText={(value) => `${value} GB`}
                step={2}
                marks={diskmarks}
                valueLabelDisplay="on"
                min={2}
                max={12}
                disabled={switchOn}
                onChange={handleDiskChange}
              />
            </Box>
          </div>
          <p className="personal-configuartion">{diskValue} GB</p>
        </div>
        <div className="personal-slider-container">
          <div className="personal-slider">
            <div className="title">
              <img src={ram} alt="" />
              <p>Ram Size (GB)</p>
            </div>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Ram Size"
                defaultValue={ramValue}
                getAriaValueText={(value) => `${value} GB`}
                step={2}
                marks={rammarks}
                valueLabelDisplay="on"
                min={2}
                max={12}
                disabled={switchOn}
                onChange={handleRamChange}
              />
            </Box>
          </div>
          <p className="personal-configuartion">{ramValue} GB</p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
