import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import SimpleCrudForm from '../CrudForm/CreateForm'
import { Upload } from '../UploadImage/UploadImage'
import Button from '../Button/Button'
import CreateGroupeForm from '../CrudForm/CreateGroupeForm'

interface PopupProps {
  onClose: () => void
}

const GroupePopUp: React.FC<PopupProps> = ({ onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true) // State to control popup visibility

  const handleClose = () => {
    setIsPopupOpen(false)
    onClose() // Call onClose to notify parent component
  }
  return (
    <div className={`popup-container ${isPopupOpen ? 'show' : 'hide'}`}>
      <div className="popup">
        <div className="popup-header">
          <AiOutlineClose className="popup-close-icon" onClick={onClose} />
          <p className="title">Add a New Group</p>
          <p className="description">Choose a username and complete all user details.</p>
        </div>

        <div>
          <CreateGroupeForm onClosePopup={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default GroupePopUp
