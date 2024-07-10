import { Dispatch, SetStateAction } from 'react'
import Swal from 'sweetalert2'
import {
  toggleCustomButtonModel,
  setPropertiesToUpdate,
} from '@src/store/slices/customButtonSlice/customButtonSlice'
import { toggleCustomLayoutModel } from '@src/store/slices/customLayoutSlice/customLayoutSlice'
import {
  addNewItem,
  toggleDisabled,
  removeEditor,
  addPopupsPage,
} from '@src/store/slices/contentSlice/contentSlice.slice'
import {
  setVideoPropertiesToUpdate,
  toggleCustomVideoModel,
} from '@src/store/slices/customVideoSlice/customvideoSlice'
import { toggleSurvey } from '@src/store/slices/survey/surveySlice'

export const handleAddPage = (dispatch: any, content: string[], selectedItem: string) => {
  dispatch(addPopupsPage({ content, selectedItem }))
}
export const handleOptionClick = (dispatch: any) => {
  dispatch(toggleDisabled())
}
export const handleCustomButton = (dispatch: any, setOpen: Dispatch<SetStateAction<boolean>>) => {
  dispatch(toggleCustomButtonModel())
  setOpen(false)
}
export const handleUpdateButton = (content: string[], dispatch: any, indexOfNewItem: number) => {
  if (content[indexOfNewItem].includes('btn-234-custom')) {
    const elementAttributes = extractButtonProperties(content[indexOfNewItem])
    dispatch(setPropertiesToUpdate(elementAttributes))
    dispatch(toggleCustomButtonModel())
  } else if (content[indexOfNewItem].includes('<iframe')) {
    const elementAttributes = extractVideoProperties(content[indexOfNewItem])
    dispatch(setVideoPropertiesToUpdate(elementAttributes))
    dispatch(toggleCustomVideoModel())
  }
}
export const handleCustomVideo = (dispatch: any, setOpen: Dispatch<SetStateAction<boolean>>) => {
  dispatch(toggleCustomVideoModel())
  setOpen(false)
}
export const handleCustomLayout = (dispatch: any, setOpen: Dispatch<SetStateAction<boolean>>) => {
  dispatch(toggleCustomLayoutModel())
  setOpen(false)
}
export const handleSurvey = (dispatch: any, setOpen: Dispatch<SetStateAction<boolean>>) => {
  dispatch(toggleSurvey())
  setOpen(false)
}
export const handleRemoveBlock = (dispatch: any, indexOfNewItem: number) => {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#506bcc',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      dispatch(removeEditor(indexOfNewItem))
    }
  })
}
export const handleTextField = (dispatch: any, indexOfNewItem: number) => {
  const elementCodeSource = '<div>type here...</div>'
  dispatch(
    addNewItem({
      indexOfNewItem,
      elementCodeSource,
    }),
  )
  // const editors: any = document.querySelectorAll('.sun-editor-editable')
  // editors[indexOfNewItem].focus()
}
function extractButtonProperties(html: string) {
  const styleMatch = html.match(/style="([^"]*)"/)
  const style = styleMatch ? styleMatch[1] : ''
  const alignmentMatch = style.match(/text-align:\s*(\w+)/)
  const alignment = alignmentMatch ? alignmentMatch[1] : ''
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const buttonElement: any = doc.querySelector('.custom-button a')
  const label = buttonElement.textContent.trim()
  let paddingX: number
  let paddingY: number
  if (buttonElement?.style?.padding.split(' ').length > 1) {
    paddingX = parseInt(buttonElement?.style?.padding.trim().split(' ')[1], 10)
    paddingY = parseInt(buttonElement?.style?.padding.trim().split(' ')[0], 10)
  } else {
    paddingX = parseInt(buttonElement?.style?.padding.trim().split(' ')[0], 10)
    paddingY = parseInt(buttonElement?.style?.padding.trim().split(' ')[0], 10)
  }
  const borderRadius = parseInt(buttonElement?.style?.borderRadius, 10)
  const color = buttonElement?.style?.color
  const backgroundColor = buttonElement?.style?.backgroundColor
  const link = buttonElement.getAttribute('href')
  const size = parseInt(buttonElement?.style?.fontSize, 10)

  return {
    label,
    paddingX,
    paddingY,
    borderRadius,
    alignment,
    color,
    backgroundColor,
    link,
    size,
  }
}
const extractVideoProperties = (frame: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(frame, 'text/html')
  const iframe = doc.getElementsByTagName('iframe')[0]
  const parentDiv: any = doc.querySelector('.custom-button')
  const childDiv: any = doc.querySelector('.popup-iframe-parent')
  const width = childDiv?.style?.width
  const activeButton = parentDiv?.style?.justifyContent
  const link = iframe.getAttribute('src')

  return {
    link,
    width,
    activeButton,
  }
}
