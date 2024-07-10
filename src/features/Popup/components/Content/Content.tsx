import { BiSolidBookContent } from 'react-icons/bi'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { lazy, MutableRefObject, Suspense } from 'react'
const PopupSettings = lazy(() => import('../PopupSettings/PopupSettings'))
const Editor = lazy(() => import('../Editor/Editor'))
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { toggleContent } from '@src/store/slices/sittingSlice/sittingSlice'
import Loader from '@src/components/Loader/Loader'

interface contentProps {
  refs: MutableRefObject<null>[]
  editorRefs: MutableRefObject<null>[]
}
const Content = ({ refs, editorRefs }: contentProps) => {
  const { isContentOpen } = useSelector((state: RootState) => state.sitting)
  const dispatch = useAppDispatch()
  const handleToggleContent = () => {
    dispatch(toggleContent())
  }
  return (
    <div className="popup-content">
      <div className="popup-content-toggled" onClick={handleToggleContent}>
        <nav>
          <BiSolidBookContent />
          <p className="popup-content-toggled-title">Content</p>
        </nav>
        {isContentOpen ? (
          <MdKeyboardArrowUp className="arrow-down-toggle" />
        ) : (
          <MdKeyboardArrowDown className="arrow-down-toggle" />
        )}
      </div>
      {isContentOpen && (
        <div className={`popup-content-editor-setting`}>
          <Suspense fallback={<Loader />}>
            <PopupSettings refs={refs} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Editor editorRefs={editorRefs} />
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default Content
