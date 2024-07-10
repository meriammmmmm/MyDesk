import { addNewItem } from '@src/store/slices/contentSlice/contentSlice.slice'
import { Popover, Button, Tooltip } from 'antd'
import { useAppDispatch, RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { createImageHTML } from './utils/HtmlElementGenerate'
import UploadButton from '@components/UploadButton/UploadButton'
import { useState, useEffect } from 'react'
import CustomLayout from './components/CustomLayout/CustomLayout'
import CustomButtonModel from './components/CustomButtonModel/CustomButtonModel'
import CustomVideoModel from './components/CustomVideoModel/CustomVideoModel'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { handleUpdateButton } from './helpers/logique'
import Survey from './components/Survey/Survey'
import {
  handleTextField,
  // handleCustomLayout,
  handleCustomButton,
  handleCustomVideo,
  handleOptionClick,
  handleRemoveBlock,
} from './helpers/logique'

const EditOption = ({ editorOptionRefs }: any) => {
  const { disabled, indexOfNewItem, content } = useSelector((state: RootState) => state.content)
  const { propertiesToUpdate } = useSelector((state: RootState) => state.customButton)
  const { videoPropertiesToUpdate } = useSelector((state: RootState) => state.customVideo)
  const { surveyToUpdate } = useSelector((state: RootState) => state.survey)

  const dispatch = useAppDispatch()
  const [_selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [open, setOpen] = useState(false)

  const navigation = (
    <div className="editor-options-navigation-container">
      <Button onClick={() => handleOptionClick(dispatch)}>
        <p>
          Drag Editor:
          {disabled ? (
            <span style={{ color: '#07B709', fontWeight: '600' }}> ON</span>
          ) : (
            <span style={{ color: '#F52424', fontWeight: '600' }}> OFF</span>
          )}
        </p>
      </Button>
      <Button onClick={() => handleTextField(dispatch, indexOfNewItem)}>Add Text</Button>
      {/* <Button onClick={() => handleCustomLayout(dispatch, setOpen)}>Custom Layout</Button> */}
      <Button onClick={() => handleCustomButton(dispatch, setOpen)}>Custom Button</Button>
      <Button onClick={() => handleCustomVideo(dispatch, setOpen)}>Custom Video </Button>
      {/* <Button onClick={() => handleSurvey(dispatch, setOpen)}>Add Survey</Button> */}
      <UploadButton setImageUrl={setImageUrl} setSelectedFile={setSelectedFile} />
    </div>
  )
  useEffect(() => {
    if (imageUrl) {
      const elementCodeSource = createImageHTML(imageUrl)
      dispatch(addNewItem({ indexOfNewItem, elementCodeSource }))
    }
  }, [imageUrl])
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return (
    <div className="edit-option-container">
      <CustomButtonModel propertiesToUpdate={propertiesToUpdate} />
      <CustomVideoModel videoPropertiesToUpdate={videoPropertiesToUpdate} />
      <Survey surveyToUpdate={surveyToUpdate} />
      <CustomLayout />
      {open && <div className="overlay-edit-option"></div>}
      <Popover
        placement="right"
        content={navigation}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Tooltip
          placement="right"
          title={<p>More advenced option (image , video, button , drag&drop...)</p>}
        >
          <Button ref={editorOptionRefs[0]}>+</Button>
        </Tooltip>
      </Popover>
      <Tooltip
        placement="right"
        title={<p>Please place the dashed line before the block you'd like to remove</p>}
      >
        <Button
          ref={editorOptionRefs[1]}
          onClick={() => content?.length > 1 && handleRemoveBlock(dispatch, indexOfNewItem)}
        >
          <AiOutlineDelete />
        </Button>
      </Tooltip>
      <Tooltip
        placement="right"
        title={<p>Please place the dashed line before the block you'd like to update</p>}
      >
        <Button
          ref={editorOptionRefs[2]}
          onClick={() => handleUpdateButton(content, dispatch, indexOfNewItem)}
        >
          <AiOutlineEdit />
        </Button>
      </Tooltip>
    </div>
  )
}

export default EditOption
