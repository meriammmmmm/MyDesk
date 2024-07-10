import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import CreateForm from '../CrudForm/CreateForm' // Assuming SimpleCrudForm is now CreateForm

interface PopupProps {
  onClose: () => void
}

const CretePopUp: React.FC<PopupProps> = ({ onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true)

  const handleClose = () => {
    setIsPopupOpen(false)
    onClose()
  }

  return (
    <div className={`popup-container ${isPopupOpen ? 'show' : 'hide'}`}>
      <div className="popup">
        <div className="popup-header">
          <AiOutlineClose className="popup-close-icon" onClick={handleClose} />
          <p className="title">Add a New User</p>
          <p className="description">Choose a username and complete all user details.</p>
        </div>

        <div>
          <CreateForm onClosePopup={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default CretePopUp
