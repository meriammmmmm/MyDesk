import { useSelector } from 'react-redux'
import { Modal, Popover } from 'antd'
import Button from '@components/Button/Button'
import { RootState, useAppDispatch } from '@store/index'
import { setSurveyDefault, toggleSurvey } from '@src/store/slices/survey/surveySlice'
import { IoIosRadioButtonOn } from 'react-icons/io'
import { ImCheckboxChecked } from 'react-icons/im'
import Question from './components/Qustion/Question'
import { useState } from 'react'
import { addNewItem, updateItem } from '@src/store/slices/contentSlice/contentSlice.slice'
import { generateSurveyHtml } from './helpers/generateSurveyHtml'
import { createSurvey } from '@src/store/slices/survey/surveyThunk'

const Survey = ({ surveyToUpdate }: any) => {
  const [question, setQuestion] = useState([
    {
      id: 1,
      type: 'radio',
      label: '',
      options: [],
    },
  ])
  const { isSurveyModalOpen } = useSelector((state: RootState) => state.survey)
  const { indexOfNewItem } = useSelector((state: RootState) => state.content)
  const dispatch = useAppDispatch()
  const handleCancel = () => {
    dispatch(toggleSurvey())
    dispatch(setSurveyDefault())
  }
  const handleOk = async () => {
    await dispatch(createSurvey(question[0])).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
        const surveyId = res?.payload?.data?._id
        const elementCodeSource = generateSurveyHtml(question, surveyId)
        if (surveyToUpdate) {
          dispatch(updateItem({ indexOfNewItem, elementCodeSource }))
        } else {
          dispatch(addNewItem({ indexOfNewItem, elementCodeSource }))
        }
        dispatch(toggleSurvey())
        dispatch(setSurveyDefault())
      }
    })
  }
  const handleAddRadioQuestion = () => {
    setQuestion([
      ...question,
      { id: question[question.length - 1].id + 1, type: 'radio', label: '', options: [] },
    ])
  }
  const handleAddCheckboxQuestion = () => {
    setQuestion([
      ...question,
      { id: question[question.length - 1].id + 1, type: 'checkbox', label: '', options: [] },
    ])
  }
  const content = (
    <div className="survey-types">
      <div className="survey-types-btn" onClick={handleAddRadioQuestion}>
        <IoIosRadioButtonOn />
        <span>Radio</span>
      </div>
      <div className="survey-types-btn" onClick={handleAddCheckboxQuestion}>
        <ImCheckboxChecked />
        <span>Checkbox</span>
      </div>
    </div>
  )
  return (
    <Modal
      width={'fit-content'}
      title={''}
      open={isSurveyModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="survey-container">
        <p className="survey-main-title">Customer's Survey creation</p>
        <span className="survey-description">
          Choose from the different types of questions available
        </span>
        <Popover placement="bottom" content={content} trigger="click">
          <Button className="add-question-btn">Add Question</Button>
        </Popover>
        <div style={{ width: '100%' }} className="survey-questions-container">
          {question?.map((el: any, i: number) => {
            return <Question question={question} setQuestion={setQuestion} key={i} data={el} />
          })}
        </div>
      </div>
    </Modal>
  )
}

export default Survey
