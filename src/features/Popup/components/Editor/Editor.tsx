import { useSelector } from 'react-redux'
import { MutableRefObject, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAppDispatch, RootState } from '@store/index'
import TextEditor from './components/TextEditor/TextEditor'
import EditorTop from './components/EditorTop/EditorTop'
import {
  changeSelectedItemContent,
  deletePopupsPage,
  handleIndexOfNewItem,
  saveLastPopupsContent,
} from '@src/store/slices/contentSlice/contentSlice.slice'
import DashedLine from './components/DashedLine/DashedLine'
import UserPopupResponse from './components/UserPopupResponse/UserPopupResponse'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { handleBeforeDragStart, handleDragEnd } from './helpers/dragAndDropHandler'
import { handleKeyDown, handleEditorChange } from './helpers/editorsHandler'
import PopupTitle from './components/PopupTitle/PopupTitle'
import { handleAddPage } from './components/EditOption/helpers/logique'

interface editorProps {
  editorRefs: MutableRefObject<null>[]
}
const Editor = ({ editorRefs }: editorProps) => {
  const dispatch = useAppDispatch()
  const { indexOfNewItem, disabled, popupWidth } = useSelector((state: RootState) => state.content)
  const { content, listOfContent, selectedItemContent } = useSelector(
    (state: RootState) => state.content,
  )
  const handlePageChange = (index: string, content: any, oldSelectedIndex: string) => {
    dispatch(changeSelectedItemContent({ index, content, oldSelectedIndex }))
  }
  useEffect(() => {
    dispatch(saveLastPopupsContent())
  }, [content])
  const handleDeletePage = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePopupsPage())
        Swal.fire({
          title: 'Deleted!',
          text: 'Your page has been deleted.',
          icon: 'success',
        })
      }
    })
  }

  return (
    <DragDropContext
      onBeforeDragStart={handleBeforeDragStart}
      onDragEnd={(result: any) => handleDragEnd(dispatch, content, result)}
    >
      <div ref={editorRefs[0]} className="editor-container">
        <EditorTop />
        <div className="editor-blocks-background-preview">
          <div className="number-swipe-popups">
            {listOfContent?.map((el) => (
              <button
                className={`swipe-popups ${el.id === selectedItemContent && 'active-page'}`}
                key={el.id}
                onClick={() => handlePageChange(el.id, content, selectedItemContent)}
              ></button>
            ))}
            <span className="ligne"></span>
            {listOfContent.length < 5 && (
              <button
                className="swipe-popups-add-page"
                onClick={() => handleAddPage(dispatch, content, selectedItemContent)}
              >
                +
              </button>
            )}
            {listOfContent.length > 1 && (
              <button className="swipe-popups-delete-page" onClick={() => handleDeletePage()}>
                -
              </button>
            )}
          </div>
          <Droppable droppableId="droppable-3">
            {(provider: any) => (
              <div
                style={{ maxWidth: popupWidth }}
                className="editor-blocks"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {/* <PopupSender /> */}
                <PopupTitle />
                {content.map((_, index) => {
                  if (index === content.length - 1) {
                    return (
                      <div key={String(index)}>
                        <DashedLine
                          refs={[editorRefs[1], editorRefs[2], editorRefs[3], editorRefs[4]]}
                          index={index}
                          indexOfNewItem={indexOfNewItem}
                        />
                        <div
                          className="last-editor-block-item"
                          onMouseOver={() => dispatch(handleIndexOfNewItem(index))}
                        ></div>
                      </div>
                    )
                  } else {
                    return (
                      <Draggable
                        key={String(index)}
                        isDragDisabled={!disabled}
                        draggableId={String(index)}
                        index={index}
                      >
                        {(provided: any) => (
                          <div>
                            <DashedLine refs={[]} index={index} indexOfNewItem={indexOfNewItem} />
                            <div
                              className="editor-blocks-field"
                              onMouseOver={() => dispatch(handleIndexOfNewItem(index))}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {content[index].includes('custom-button') ? (
                                <div
                                  className="button-expect-editor"
                                  dangerouslySetInnerHTML={{ __html: content[index] }}
                                ></div>
                              ) : (
                                <TextEditor
                                  isDisable={disabled}
                                  onChange={(newContent: any) => {
                                    handleEditorChange(dispatch, newContent, index)
                                  }}
                                  value={content[index]}
                                  onKeyDown={(event: any) => handleKeyDown(dispatch, event, index)}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  }
                })}
                {provider.placeholder}
                <UserPopupResponse />
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}

export default Editor
