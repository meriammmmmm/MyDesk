import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { GoGoal } from 'react-icons/go'
import { GrAdd } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { toggleGoal } from '@src/store/slices/sittingSlice/sittingSlice'
import { Input, message } from 'antd'
import { useState } from 'react'
import { addGoal } from '@src/store/slices/popup/popupSlice'
const Goal = () => {
  const [goalValue, setGoalValue] = useState('')
  const { isGoalOpen } = useSelector((state: RootState) => state.sitting)
  const dispatch = useAppDispatch()
  const handleToggleGoal = () => {
    dispatch(toggleGoal())
  }
  const handleGoal = () => {
    if (goalValue.trim().length <= 3) {
      message.error('Goal length must be at least 4 characters')
    } else {
      dispatch(addGoal(goalValue))
      message.success('Goal added successfully')
    }
  }
  return (
    <div className="goal-container">
      <div className="goal-toggled-container" onClick={handleToggleGoal}>
        <nav>
          <GoGoal />
          <p className="goal-toggled-title">Goal</p>
        </nav>
        {isGoalOpen ? (
          <MdKeyboardArrowUp className="arrow-down-toggle" />
        ) : (
          <MdKeyboardArrowDown className="arrow-down-toggle" />
        )}
      </div>
      {isGoalOpen && (
        <div className="goal-content">
          <p>Understand how your post drives people to take action in your product.</p>
          <Input
            value={goalValue}
            onChange={(e) => setGoalValue(e.target.value)}
            className={'goal-input'}
            placeholder="Add Your Goal ..."
          />
          <button onClick={handleGoal}>
            <GrAdd /> Add goal
          </button>
        </div>
      )}
    </div>
  )
}

export default Goal
