import React, { useState, useEffect, useRef, RefObject } from 'react'
import avatar from '../../assets/images/avatr.png'
import upload from '../../assets/icons/uplaod.svg'

// Extending the File interface to include the preview property
interface FileWithPreview extends File {
  preview?: string
}

function removeItems(arr: any[], item: number) {
  for (let i = 0; i < item; i++) {
    arr.pop()
  }
}

function useFiles({ initialState = [], maxFiles }: { initialState?: any[]; maxFiles: number }) {
  const [state, setState] = useState<FileWithPreview[]>(initialState)

  function withBlobs(files: FileList) {
    const destructured: FileWithPreview[] = Array.from(files)
    if (destructured.length > maxFiles) {
      const difference = destructured.length - maxFiles
      removeItems(destructured, difference)
    }
    const blobs = destructured
      .map((file) => {
        if (file.type.includes('image')) {
          const newFile = file as FileWithPreview
          newFile.preview = URL.createObjectURL(file)
          return newFile
        }
        return null
      })
      .filter((elem): elem is FileWithPreview => elem !== null)

    setState(blobs)
  }

  return [state, withBlobs] as const
}

interface UploadProps {
  onDrop?: (files: FileWithPreview[]) => void
  maxFiles?: number
}

function Upload({ onDrop, maxFiles = 1 }: UploadProps) {
  const [over, setOver] = useState(false)
  const [files, setFiles] = useFiles({ maxFiles })
  const inputRef: RefObject<HTMLInputElement> = useRef(null)

  useEffect(() => {
    if (onDrop) {
      onDrop(files)
    }
  }, [files])

  return (
    <div className="upload-section">
      <div
        onClick={() => {
          inputRef?.current?.click()
        }}
        onDrop={(e) => {
          e.preventDefault()
          setFiles(e.dataTransfer.files)
          setOver(false)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setOver(false)
        }}
        className={over ? 'upload-container over' : 'upload-container'}
      >
        <div className="uploader-button">
          <img src={upload} alt="" />
          <div className="uploder-instruction">
            {' '}
            <p>
              <span>Click to upload</span>
              or drag and drop
            </p>
            <p className="uploder-types">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </div>
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              setFiles(e.target.files)
            }
          }}
          multiple={maxFiles > 1}
        />
      </div>
      <div className="blob-container">
        {files.length > 0 ? (
          files.map((file) => <img key={file.name} src={file.preview} alt="your file" />)
        ) : (
          <img src={avatar} alt="default avatar" />
        )}
      </div>
    </div>
  )
}

export { Upload }
