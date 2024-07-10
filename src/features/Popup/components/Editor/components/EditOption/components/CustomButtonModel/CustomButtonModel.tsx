import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, message } from 'antd'
import { RootState, useAppDispatch } from '@store/index'
import Input from '@src/components/Input/Input'
import {
  setPropertiesToUpdateToDefault,
  toggleCustomButtonModel,
} from '@src/store/slices/customButtonSlice/customButtonSlice'
import { RangeComp } from './components/RangeComp/RangeComp'
import PickerColor from './components/PickerColor/PickerColor'
import AlignComp from './components/AlignComp/AlignComp'
import { generateButtonToPreview } from './components/ButtonToPreview/ButtonToPreview'
import { addNewItem, updateItem } from '@src/store/slices/contentSlice/contentSlice.slice'

const CustomButtonModel = ({ propertiesToUpdate }: any) => {
  const { indexOfNewItem } = useSelector((state: RootState) => state.content)
  const { isCustomButtonModelOpen } = useSelector((state: RootState) => state.customButton)
  const dispatch = useAppDispatch()
  const [label, setLabel] = useState(propertiesToUpdate ? 'hello world' : 'submit ')
  const [link, setLink] = useState('https://softylines.com')
  const [paddingX, setPaddingX] = useState(25)
  const [size, setSize] = useState(15)
  const [paddingY, setPaddingY] = useState(10)
  const [borderRadius, setBorderRadius] = useState(5)
  const [alignment, setAlignment] = useState('center')
  const [activeButton, setActiveButton] = useState('center')
  const [color, setColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#358ce3')
  useEffect(() => {
    if (propertiesToUpdate) {
      setLabel(propertiesToUpdate['label'])
      setLink(propertiesToUpdate['link'])
      setPaddingX(propertiesToUpdate['paddingX'])
      setSize(propertiesToUpdate['size'])
      setPaddingY(propertiesToUpdate['paddingY'])
      setBorderRadius(propertiesToUpdate['borderRadius'])
      setAlignment(propertiesToUpdate['alignment'])
      setActiveButton(propertiesToUpdate['alignment'])
      setColor(propertiesToUpdate['color'])
      setBackgroundColor(propertiesToUpdate['backgroundColor'])
    }
  }, [propertiesToUpdate])
  const handleCancel = () => {
    dispatch(toggleCustomButtonModel())
    dispatch(setPropertiesToUpdateToDefault())
  }

  const sanitizedHtml = generateButtonToPreview(
    label,
    paddingX,
    paddingY,
    borderRadius,
    alignment,
    color,
    backgroundColor,
    link,
    size,
  )

  const handleOk = async () => {
    if (label?.length < 2) {
      message?.error('Button value must be at least 2 characters')
    } else {
      const elementCodeSource = sanitizedHtml
      if (propertiesToUpdate) {
        dispatch(updateItem({ indexOfNewItem, elementCodeSource }))
      } else {
        await dispatch(addNewItem({ indexOfNewItem, elementCodeSource }))
      }
      dispatch(toggleCustomButtonModel())
      dispatch(setPropertiesToUpdateToDefault())
    }
  }
  return (
    <Modal
      title={<p className="custom-button-main-title">Create Your Custom Button :</p>}
      open={isCustomButtonModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="custom-button-container">
        <div className="button-preview" dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
        <div className="button-label">
          <span className="button-label-value">Label:</span>
          <Input
            variant="dark"
            value={label}
            onChange={(e: any) => setLabel(e.target.value)}
            placeholder="Enter the label of the button"
          />
        </div>
        <div className="button-label">
          <span className="button-label-value">Link:</span>
          <Input
            variant="dark"
            value={link}
            onChange={(e: any) => setLink(e.target.value)}
            placeholder="Enter the button link"
          />
        </div>
        <RangeComp min={0} max={60} label="PaddingX:" value={paddingX} onChange={setPaddingX} />
        <RangeComp min={0} max={30} label="PaddingY:" value={paddingY} onChange={setPaddingY} />
        <RangeComp min={11} max={24} label="Font-Size:" value={size} onChange={setSize} />
        <RangeComp
          min={0}
          max={50}
          label="Border Radius:"
          value={borderRadius}
          onChange={setBorderRadius}
        />
        <PickerColor label={'background'} value={backgroundColor} onChange={setBackgroundColor} />
        <PickerColor label={'Color'} value={color} onChange={setColor} />
        <AlignComp
          label={'Align:'}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          setAlignment={setAlignment}
        />
      </div>
    </Modal>
  )
}

export default CustomButtonModel
