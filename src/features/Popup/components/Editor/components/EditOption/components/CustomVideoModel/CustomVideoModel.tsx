import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import { RootState, useAppDispatch } from '@store/index'
import Input from '@src/components/Input/Input'
import { useState, useEffect } from 'react'
import { addNewItem, updateItem } from '@src/store/slices/contentSlice/contentSlice.slice'
import { generateVideoToPreview } from './utils/generateVideoToPreview'
import AlignComp from '../CustomButtonModel/components/AlignComp/AlignComp'
import WidthComp from '../CustomButtonModel/components/WidthComp/WidthComp'
import { toggleCustomVideoModel } from '@src/store/slices/customVideoSlice/customvideoSlice'
import { setPropertiesToUpdateToDefault } from '@src/store/slices/customButtonSlice/customButtonSlice'

const CustomVideoModel = ({ videoPropertiesToUpdate }: any) => {
  const { isCustomVideoModelOpen } = useSelector((state: RootState) => state.customVideo)
  const dispatch = useAppDispatch()
  const { indexOfNewItem } = useSelector((state: RootState) => state.content)
  const [link, setLink] = useState('https://www.youtube.com/embed/W2smLkhq7yk')
  const [activeButton, setActiveButton] = useState('center')
  const [activeWidth, setActiveWidth] = useState('100%')
  const [alignment, setAlignment] = useState('center')
  const [width, setWidth] = useState('100%')
  const [sanitizedHtml, setSanitizedHtml] = useState('')
  useEffect(() => {
    if (isCustomVideoModelOpen || link || alignment || width) {
      setSanitizedHtml(generateVideoToPreview(link, alignment, width))
    }
  }, [isCustomVideoModelOpen, link, alignment, width])

  useEffect(() => {
    if (videoPropertiesToUpdate) {
      setLink(videoPropertiesToUpdate['link'])
      setActiveButton(videoPropertiesToUpdate['activeButton'])
      setAlignment(videoPropertiesToUpdate['activeButton'])
      setWidth(videoPropertiesToUpdate['width'])
      setActiveWidth(videoPropertiesToUpdate['width'])
    }
  }, [videoPropertiesToUpdate])

  const handleCancel = () => {
    dispatch(toggleCustomVideoModel())
    dispatch(setPropertiesToUpdateToDefault())
  }
  const handleOk = () => {
    const elementCodeSource = sanitizedHtml
    if (videoPropertiesToUpdate) {
      dispatch(updateItem({ indexOfNewItem, elementCodeSource }))
    } else {
      dispatch(addNewItem({ indexOfNewItem, elementCodeSource }))
    }
    dispatch(toggleCustomVideoModel())
    dispatch(setPropertiesToUpdateToDefault())
  }
  const handleChangeInput = (e: any) => {
    const url = e.target.value
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    )
    if (youtubeMatch) {
      const videoId = youtubeMatch[1]
      setLink(`https://www.youtube.com/embed/${videoId}`)
    } else {
      setLink(url)
    }
  }
  return (
    <Modal
      title={<p className="custom-button-main-title">Create Your Custom Video :</p>}
      open={isCustomVideoModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="custom-button-container">
        <div className="button-preview" dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
        <div className="button-label">
          <span className="button-label-value">Link:</span>
          <Input
            variant="dark"
            value={link}
            onChange={handleChangeInput}
            placeholder="Enter the button link"
          />
        </div>
        <AlignComp
          label={'Align:'}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          setAlignment={setAlignment}
        />

        <WidthComp
          label={'Width:'}
          activeWidth={activeWidth}
          setActiveWidth={setActiveWidth}
          setWidth={setWidth}
        />
      </div>
    </Modal>
  )
}

export default CustomVideoModel
