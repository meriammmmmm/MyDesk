import sendIcon from '@assets/icons/popup/send.png'
import msgIcon from '@assets/icons/popup/message.png'
const PopupResponse = () => {
  return (
    <div className="popup-response-container">
      <div className="popup-response-message">
        <img className="popup-response-icon" src={msgIcon} alt="" />
        <span>Write a replay...</span>
      </div>
      <div className="popup-response-reaction-file">
        <img className="popup-response-icon" src={sendIcon} alt="" />
      </div>
    </div>
  )
}

export default PopupResponse
