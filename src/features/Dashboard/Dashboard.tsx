import { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/system'
import low from '../../assets/images/low.png'
import high from '../../assets/images/high.png'
import medium from '../../assets/images/medium.png'
import cpu from '../../assets/icons/cpu.svg'
import cpu1 from '../../assets/icons/cpu1.svg'
import disk from '../../assets/icons/disk.svg'
import ram from '../../assets/icons/ram.svg'
import { useAppDispatch } from '@src/store'
import { fetchImages, editImages } from '@src/store/slices/images/imageThunk'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import Modal from './components/DashbordModal/DashbordModal'
import User from '../Admin/User/User'

export interface Tool {
  name: string
  image: string
  id: string // Ensure id is part of Tool interface
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

const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)
  const [switchOn, setSwitchOn] = useState(true)
  const [cpuValue, setCpuValue] = useState(2)
  const [ramValue, setRamValue] = useState(2)
  const [diskValue, setDiskValue] = useState(2)
  const [selectedView, setSelectedView] = useState('All')

  const handleClick = (tool: any) => {
    if (tool.id) {
      setSelectedTool(tool)
    } else {
      console.error('Tool does not have an ID:', tool)
    }
  }

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index)
    if (index === 0) {
      setCpuValue(2)
      setRamValue(2)
      setDiskValue(2)
    } else if (index === 1) {
      setCpuValue(4)
      setRamValue(4)
      setDiskValue(4)
    } else if (index === 2) {
      setCpuValue(8)
      setRamValue(8)
      setDiskValue(8)
    }
  }

  const handleClose = () => {
    setSelectedTool(null)
    setSelectedCardIndex(null)
  }

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked)
  }

  const handleCpuChange = (event: Event, newValue: number | number[]) => {
    setCpuValue(newValue as number)
  }

  const handleRamChange = (event: Event, newValue: number | number[]) => {
    setRamValue(newValue as number)
  }

  const handleDiskChange = (event: Event, newValue: number | number[]) => {
    setDiskValue(newValue as number)
  }

  const handleSubmit = async () => {
    if (selectedTool) {
      const newImagesData = {
        ...selectedTool,
        cpu: cpuValue,
        ramSize: ramValue,
        diskSize: diskValue,
        status: true,
        startTime: Date.now(),
      }

      try {
        await dispatch(
          editImages({
            newImagesData: { status: true, startTime: Date.now() },
            id: selectedTool.id,
          }),
        )
        handleClose()
      } catch (error) {
        console.error('Failed to update image:', error)
      }
    }
  }

  const marks = [
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
  ]

  function valuetext(value: number) {
    return `${value} CPU`
  }

  const dispatch = useAppDispatch()
  const { images } = useSelector((state: any) => state.images)

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const getFilteredImages = () => {
    if (selectedView === 'All') return images
    return images.filter((image: any) => image.tag && image.tag.includes(selectedView))
  }

  const handleSwitch = (view: any) => {
    setSelectedView(view)
  }
  console.log(getFilteredImages)

  return (
    <>
      {' '}
      <div className="tool-list">
        {getFilteredImages().map((tool: any, index: any) => (
          <div key={index} className="tool" onClick={() => handleClick(tool)}>
            <img src={tool.image} />
            <h3>{tool.name}</h3>
          </div>
        ))}
        {selectedTool && (
          <Modal
            selectedTool={selectedTool}
            selectedCardIndex={selectedCardIndex}
            switchOn={switchOn}
            cpuValue={cpuValue}
            ramValue={ramValue}
            diskValue={diskValue}
            handleClose={handleClose}
            handleSwitchChange={handleSwitchChange}
            handleCardClick={handleCardClick}
            handleCpuChange={handleCpuChange}
            handleRamChange={handleRamChange}
            handleDiskChange={handleDiskChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="switcher-container-dashboard  ">
        <div className="tab-switcher-dashboard">
          <button
            className={`switcher-button ${selectedView === 'All' ? 'active' : ''}`}
            onClick={() => handleSwitch('All')}
          >
            All images{' '}
          </button>
          <button
            className={`switcher-button ${selectedView === 'Communication' ? 'active' : ''}`}
            onClick={() => handleSwitch('Communication')}
          >
            Communication
          </button>
          <button
            className={`switcher-button ${selectedView === 'Desktop' ? 'active' : ''}`}
            onClick={() => handleSwitch('Desktop')}
          >
            Desktop
          </button>
          <button
            className={`switcher-button ${selectedView === 'Games' ? 'active' : ''}`}
            onClick={() => handleSwitch('Games')}
          >
            Games
          </button>
          <button
            className={`switcher-button ${selectedView === 'Office' ? 'active' : ''}`}
            onClick={() => handleSwitch('Office')}
          >
            Office
          </button>
          <button
            className={`switcher-button ${selectedView === 'Multimedia' ? 'active' : ''}`}
            onClick={() => handleSwitch('Multimedia')}
          >
            Multimedia
          </button>
          <button
            className={`switcher-button ${selectedView === 'Chat' ? 'active' : ''}`}
            onClick={() => handleSwitch('Chat')}
          >
            Chat
          </button>
          <button
            className={`switcher-button ${selectedView === 'Privacy' ? 'active' : ''}`}
            onClick={() => handleSwitch('Privacy')}
          >
            Privacy
          </button>
        </div>
      </div>
    </>
  )
}

export default Dashboard
