import { Key, useEffect, useState } from 'react'
import { useAppDispatch } from '@src/store'
import { fetchImages, editImages } from '@src/store/slices/images/imageThunk'
import { useSelector } from 'react-redux'
import Modal from './components/DashbordModal/DashbordModal'
import notFound from '../../assets/images/not-found.webp'
export interface Tool {
  name: string
  image: string
  id: string
}

const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)
  const [switchOn, setSwitchOn] = useState(true)
  const [cpuValue, setCpuValue] = useState(2)
  const [ramValue, setRamValue] = useState(2)
  const [diskValue, setDiskValue] = useState(2)
  const [selectedView, setSelectedView] = useState('All')

  const handleClick = (tool: Tool) => {
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
      setDiskValue(16)
    } else if (index === 1) {
      setCpuValue(4)
      setRamValue(8)
      setDiskValue(64)
    } else if (index === 2) {
      setCpuValue(8)
      setRamValue(32)
      setDiskValue(512)
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
            newImagesData: {
              status: true,
              startTime: Date.now(),
              cpu: cpuValue,
              ramSize: ramValue,
              diskSize: diskValue,
            },
            id: selectedTool.id,
          }),
        )

        handleClose()
      } catch (error) {
        console.error('Failed to update image:', error)
      }
    }
  }

  const dispatch = useAppDispatch()
  const { images } = useSelector((state: any) => state.images)

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const getFilteredImages = () => {
    if (selectedView === 'All') return images
    const filteredImages = images.filter(
      (image: any) => image.tag && image.tag.includes(selectedView),
    )
    return filteredImages.length > 0 ? filteredImages : []
  }

  const handleSwitch = (view: any) => {
    setSelectedView(view)
  }

  return (
    <>
      {' '}
      <div className="tool-list">
        {getFilteredImages().length > 0 ? (
          getFilteredImages().map((tool: Tool, index: Key | null | undefined) => (
            <div key={index} className="tool" onClick={() => handleClick(tool)}>
              <img src={tool.image} />
              <h3>{tool.name}</h3>
            </div>
          ))
        ) : (
          <img src={notFound} alt="notFound" className="no-image-found" />
        )}
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
            imageId={''}
          />
        )}
      </div>
      <div className="switcher-container-dashboard">
        <div className="tab-switcher-dashboard">
          {[
            'All',
            'Communication',
            'Desktop',
            'Games',
            'Office',
            'Multimedia',
            'Chat',
            'Privacy',
          ].map((view) => (
            <button
              key={view}
              className={`switcher-button ${selectedView === view ? 'active' : ''}`}
              onClick={() => handleSwitch(view)}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard
