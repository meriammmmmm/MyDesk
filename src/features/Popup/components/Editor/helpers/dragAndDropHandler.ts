import { DropResult } from 'react-beautiful-dnd'
import { updateContentOrder } from '@src/store/slices/contentSlice/contentSlice.slice'
export const handleDragEnd = (dispatch: any, content: any, result: DropResult) => {
  if (!result.destination) return
  const { source, destination } = result
  const newContent = Array.from(content)
  const [removed] = newContent.splice(source.index, 1)
  newContent.splice(destination.index, 0, removed)
  dispatch(updateContentOrder(newContent))
}
export const handleBeforeDragStart = () => {
  const editors = document.querySelectorAll('.sun-editor-editable')
  Array.from(editors).forEach(function (editor: any) {
    editor.blur()
  })
}
