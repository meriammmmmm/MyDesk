import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'

const EmojiOnlyPreview = () => {
  const { emoji } = useSelector((state: RootState) => state.emojis)
  return (
    <div className="emoji-response-container">
      <div className="emoji-buttons-container">
        {emoji?.map((el: string, i: number) => {
          return (
            <button style={{ fontSize: '20px', minWidth: '20px' }} key={i}>
              {el}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EmojiOnlyPreview
