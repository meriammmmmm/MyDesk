import Button from '@src/components/Button/Button'
import { RootState, useAppDispatch } from '@src/store'
import { handleTitleChange } from '@src/store/slices/popup/popupSlice'
import { message, Popover } from 'antd'
import { MutableRefObject, useState, useEffect } from 'react'
import { FaDesktop, FaRegSave } from 'react-icons/fa'
import { HiOutlinePlay } from 'react-icons/hi'
import { MdPreview } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { generatePopupHTML } from '../../helpers/generatePopupContainer'
import DesktopPreview from './components/DesktopPreview/DesktopPreview'
import { HiMiniDevicePhoneMobile } from 'react-icons/hi2'
import MobilePreview from './components/MobilePreview/MobilePreview'
import { saveLastPopupsContent } from '@src/store/slices/contentSlice/contentSlice.slice'
import { addedDirections } from '@src/utils/addedDirections'

interface popupControlsProps {
  handleClick: () => void
  refs: MutableRefObject<null>[]
  socket: any
  idOfPopup: string | undefined
  updateDraftPopup: () => void
}
const PopupControls = ({ handleClick, refs, updateDraftPopup }: popupControlsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { titleOfPopup } = useSelector((state: RootState) => state.popup)
  const { parameters, popupWidth, listOfContent } = useSelector((state: RootState) => state.content)
  const { emoji } = useSelector((state: RootState) => state.emojis)
  const [postPreview, setPostPreview] = useState('')
  const [isMobilePreviewOpen, setMobilePreviewOpen] = useState(false)
  const handleUpdate = () => {
    dispatch(saveLastPopupsContent())
    if (titleOfPopup.trim().length < 2) {
      message.error('invalid popup title')
    } else {
      updateDraftPopup()
      navigate('/posts')
    }
  }
  const previewPopup = () => {
    let blocks: string[] = []
    listOfContent.map((el) => {
      const newContent = addedDirections(el?.content)
      blocks.push(newContent?.join(''))
    })
    setPostPreview(
      generatePopupHTML(
        blocks,
        parameters,
        emoji,
        '',
        titleOfPopup,
        parameters?.status,
        popupWidth,
        true,
      ),
    )
    setMobilePreviewOpen(false)
  }
  const closePopup = () => {
    setPostPreview('')
    document?.querySelector('.popup-taki')?.remove()
  }
  useEffect(() => {
    document.querySelector('.close-btn')?.addEventListener('click', async () => {
      closePopup()
    })
    document.querySelector('.overlay-popups')?.addEventListener('click', async () => {
      closePopup()
    })
  }, [postPreview])

  return (
    <div className="popup-controls-container">
      {postPreview && <DesktopPreview closePopup={closePopup} postPreview={postPreview} />}
      {isMobilePreviewOpen && (
        <MobilePreview
          closePopup={closePopup}
          isMobilePreviewOpen={isMobilePreviewOpen}
          setMobilePreviewOpen={setMobilePreviewOpen}
        />
      )}
      <div className="popup-save-control">
        <input
          ref={refs[0]}
          className="title-popup-input"
          value={titleOfPopup}
          onChange={(e: any) => dispatch(handleTitleChange(e.target.value))}
          placeholder="Add Title"
        ></input>
      </div>
      <div className="popup-btns-control">
        <div className="popup-save-control-draft">Draft</div>
        <Button refs={refs[1]} onClick={() => handleUpdate()} className="popup-save-close-btn">
          <FaRegSave />
          <span>Save as Draft</span>
        </Button>
        <Popover
          placement="bottom"
          content={
            <div className="mobile-desktop-preview">
              <Button onClick={previewPopup} className="desktop-preview-btn ">
                <FaDesktop />
                <span>Desktop </span>
              </Button>
              <Button
                onClick={() => {
                  setMobilePreviewOpen(true), dispatch(saveLastPopupsContent())
                }}
                className=" mobile-preview-btn"
              >
                <HiMiniDevicePhoneMobile />
                <span>Mobile </span>
              </Button>
            </div>
          }
          trigger="hover"
        >
          <Button refs={refs[2]} className="popup-save-close-btn ">
            <MdPreview />
            <span>Preview</span>
          </Button>
        </Popover>
        <Button refs={refs[3]} onClick={handleClick} className="popup-set-live-btn">
          <HiOutlinePlay />
          <span>Set Live</span>
        </Button>
      </div>
    </div>
  )
}

export default PopupControls
