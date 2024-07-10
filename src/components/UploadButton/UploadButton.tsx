import { message } from 'antd'
import React, { ChangeEvent, SetStateAction, Dispatch, MutableRefObject } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { compressImage } from './compressor'

interface UploadButtonProps {
  setImageUrl: Dispatch<SetStateAction<string>>
  setSelectedFile: Dispatch<SetStateAction<File | null>>
  isProfileUploaded?: boolean
  ref?: MutableRefObject<null>
}

const UploadButton: React.FC<UploadButtonProps> = ({
  setSelectedFile,
  setImageUrl,
  isProfileUploaded,
  ref,
}) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const maxSize = 1024 * 1024 * 5 // 1MB in bytes

    if (file) {
      if (file.size > maxSize) {
        message.error('File size exceeds the maximum limit of 5MB.')
        event.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onload = async (e) => {
        const uploadedImageUrl = e.target?.result as string
        const compressedImg = await compressImage(uploadedImageUrl, 0.3)
        setImageUrl(compressedImg)
      }
      setSelectedFile(file)
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <label ref={ref} className="upload-btn" htmlFor="upload-button">
        {isProfileUploaded && <AiOutlineCloudUpload />}
        <span>Upload Image</span>
      </label>
      <input
        id="upload-button"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileUpload}
      />
    </>
  )
}

export default UploadButton
