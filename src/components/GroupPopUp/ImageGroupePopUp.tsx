import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import CreateImageGroupe from '../CrudForm/CreateImageGroupe'

interface PopupProps {
  onClose: () => void
}

const GroupePopUp: React.FC<PopupProps> = ({ onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true)

  const handleClose = () => {
    setIsPopupOpen(false)
    onClose()
  }
  return (
    <div className={`popup-container ${isPopupOpen ? 'show' : 'hide'}`}>
      <div className="popup">
        <div className="popup-header">
          <AiOutlineClose className="popup-close-icon" onClick={onClose} />
          <p className="title">Add a New ImageGroup</p>
          <p className="description">Choose a username and complete all user details.</p>
        </div>

        <div>
          <CreateImageGroupe onClosePopup={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default GroupePopUp
