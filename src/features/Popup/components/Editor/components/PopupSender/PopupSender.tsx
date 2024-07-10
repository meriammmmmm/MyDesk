import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
const PopupSender = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { domainData } = useSelector((state: RootState) => state.auth)
  // const { titleOfPopup } = useSelector((state: RootState) => state.popup)

  return (
    <>
      <div className="popup-sender-container">
        <div className="popup-sender-icon">
          <span>{user?.name[0]}</span>
        </div>
        <div className="popup-sender-details">
          <p className="popup-sender-name-details">
            {user?.name} <span>from {domainData?.name}</span>
          </p>
        </div>
      </div>
      {/* <p className='popup-title-editor'>{titleOfPopup}</p> */}
    </>
  )
}

export default PopupSender
