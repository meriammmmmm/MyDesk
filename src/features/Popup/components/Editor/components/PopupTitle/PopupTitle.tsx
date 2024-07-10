import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

const PopupTitle = () => {
  const { titleOfPopup } = useSelector((state: RootState) => state.popup)
  const { parameters } = useSelector((state: RootState) => state.content)

  return (
    <p className="popup-title-editor">{parameters?.status === 'private' ? '' : titleOfPopup}</p>
  )
}

export default PopupTitle
