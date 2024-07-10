import { Checkbox, Radio } from 'antd'
import { FaCheck } from 'react-icons/fa6'
import { MdModeEdit } from 'react-icons/md'
import { useState } from 'react'
import { useRef } from 'react'
import { FiTrash2 } from 'react-icons/fi'

const CheckboxType = ({ type, label, indexOfOption, question, setQuestion, questionId }: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(label)
  const editableRef: any = useRef()

  const handleRemove = () => {
    const updatedQuestions = [...question]
    const questionToUpdate = updatedQuestions.find((q) => q.id === questionId)
    if (questionToUpdate) {
      if (indexOfOption >= 0 && indexOfOption < questionToUpdate.options.length) {
        questionToUpdate.options.splice(indexOfOption, 1)
        setQuestion(updatedQuestions)
      }
    }
  }
  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    setContent(editableRef?.current?.innerText)
    const updatedQuestion = question.map((item: any) => {
      if (item.id === questionId) {
        const newOptions = [...item.options]
        newOptions[indexOfOption] = editableRef?.current?.innerText
        return {
          ...item,
          options: newOptions,
        }
      }
      return item
    })

    setQuestion(updatedQuestion)
  }
  return (
    <div className={`checkbox-question-type ${isEditing ? 'editing' : ''}`}>
      {type === 'radio' ? <Radio /> : <Checkbox></Checkbox>}
      {isEditing ? (
        <div
          ref={editableRef}
          contentEditable={true}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSave()
            }
          }}
          className="editable-content editing"
        >
          {content}
        </div>
      ) : (
        <div onClick={handleEditClick} className="editable-content">
          {content}
        </div>
      )}
      <div className="controls-checkbox-option-btns-container">
        {isEditing ? (
          <button className="checkebox-option-button" onClick={handleSave}>
            <FaCheck />
          </button>
        ) : (
          <button className="checkebox-option-button" onClick={handleEditClick}>
            <MdModeEdit />
          </button>
        )}
        <button
          className="checkebox-option-button remove-checkebox-option-button "
          onClick={handleRemove}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default CheckboxType
