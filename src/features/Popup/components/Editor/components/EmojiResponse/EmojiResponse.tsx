import EmojiPicker from 'emoji-picker-react'
import { EmojiClickData } from 'emoji-picker-react'
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { useAppDispatch, RootState } from '../../../../../../store/index'
import {
  removeEmoji,
  selectEmoji,
  setAddedEmoji,
  setHover,
  setIndex,
  togglePicker,
} from '@src/store/slices/emojiSlice/emojiSlice'
import { useSelector } from 'react-redux'

const EmojiResponse = () => {
  const { emoji, isHover, isPicker } = useSelector((state: RootState) => state.emojis)
  const dispatch = useAppDispatch()
  const handleEmoji = (index: number) => {
    dispatch(togglePicker())
    dispatch(setIndex(index))
  }
  return (
    <div
      onMouseLeave={() => dispatch(setHover(false))}
      onMouseOver={() => dispatch(setHover(true))}
      className="emoji-response-container"
    >
      <div className="emoji-buttons-container">
        {emoji.map((el: string, index: number) => {
          return (
            <button onClick={() => handleEmoji(index)} key={index} className="emoji-button">
              {el}
            </button>
          )
        })}
        {emoji.length < 5 && (
          <button
            onClick={() => dispatch(setAddedEmoji())}
            style={{ opacity: `${isHover ? 1 : 0}` }}
            className={`add-emoji-button `}
          >
            +
          </button>
        )}
      </div>
      {isPicker && (
        <>
          <div className="emoji-picker-popup">
            <div className="emoji-picker-popup-delete-close">
              <AiFillDelete onClick={() => dispatch(removeEmoji())} />
              <AiOutlineClose onClick={() => dispatch(togglePicker())} />
            </div>
            <EmojiPicker
              height={300}
              width={'100%'}
              onEmojiClick={(emojiData: EmojiClickData) => dispatch(selectEmoji(emojiData))}
              autoFocusSearch={false}
              searchDisabled
            />
          </div>
          <div onClick={() => dispatch(togglePicker())} className="emoji-picker-overlay"></div>
        </>
      )}
    </div>
  )
}

export default EmojiResponse
