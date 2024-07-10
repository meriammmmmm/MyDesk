import EmojiResponse from '../EmojiResponse/EmojiResponse'
import PopupResponse from '../PopupResponse/PopupResponse'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

const UserPopupResponse = () => {
  const { parameters } = useSelector((state: RootState) => state.content)
  return (
    <>
      {parameters['replaytype'] === 'text' ? (
        <PopupResponse />
      ) : parameters['replaytype'] === 'reaction' ? (
        <EmojiResponse />
      ) : null}
    </>
  )
}

export default UserPopupResponse
