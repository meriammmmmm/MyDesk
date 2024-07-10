import Input from '@src/components/Input/Input'
import CheckboxType from '../CheckboxType/CheckboxType'
import { IoIosAddCircle } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'

const Question = ({ data, setQuestion, question }: any) => {
  const addOptionToQuestion = () => {
    const updatedQuestion = question.map((item: any) => {
      if (item.id === data?.id) {
        return {
          ...item,
          options: [...item.options, 'Response'],
        }
      }
      return item
    })
    setQuestion(updatedQuestion)
  }
  const onQuestionChange = (e: any) => {
    const updatedQuestions = question.map((q: any) => {
      if (q.id === data?.id) {
        return { ...q, label: e.target.value }
      }
      return q
    })
    setQuestion(updatedQuestions)
  }
  const removeQuestion = () => {
    if (question.length > 1) {
      const updatedQuestions = question.filter((q: any) => q.id !== data?.id)
      setQuestion(updatedQuestions)
    }
  }
  return (
    <div className="question-container">
      <span>
        {data?.type === 'readio' ? 'Radio Answer Question:' : 'Checkbox Answer Question:'}
      </span>
      <Input
        placeholder="Add your Question..."
        variant="dark"
        value={data?.label}
        onChange={onQuestionChange}
      />
      <div className="question-answer-container">
        {data.options.map((el: any, i: number) => {
          const component =
            data.type === 'radio' ? (
              <CheckboxType
                questionId={data?.id}
                question={question}
                setQuestion={setQuestion}
                type={'radio'}
                key={i}
                indexOfOption={i}
                label={el}
              />
            ) : (
              <CheckboxType
                questionId={data?.id}
                question={question}
                setQuestion={setQuestion}
                type={'checkbox'}
                key={i}
                indexOfOption={i}
                label={el}
              />
            )
          return component
        })}
        <div onClick={addOptionToQuestion} className="add-option-btn">
          <IoIosAddCircle />
          <span>Add Option</span>
        </div>
      </div>
      <IoCloseSharp onClick={removeQuestion} className="remove-survey-question" />
    </div>
  )
}

export default Question
