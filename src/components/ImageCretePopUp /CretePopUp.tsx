import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import SimpleCrudForm from '../CrudForm/CreateForm'
import { Upload } from '../UploadImage/UploadImage'
import Button from '../Button/Button'
import ImageCreateForm from '../CrudForm/ImageCreateForm'

interface PopupProps {
  onClose: () => void
}

const ImageCretePopUp: React.FC<PopupProps> = ({ onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true)

  const handleClose = () => {
    setIsPopupOpen(false)
    onClose()
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <AiOutlineClose className="popup-close-icon" onClick={onClose} />
          <p className="title">Add a New Image</p>
          <p className="description">Choose a username and complete all user details.</p>
        </div>

        <div>
          <ImageCreateForm onClosePopup={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default ImageCretePopUp
