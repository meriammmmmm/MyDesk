import { FaQuestion } from 'react-icons/fa6'
import { Tooltip } from 'antd'
import { useAppDispatch } from '@store/index'
import { toggleEditorTour, togglePostsTour } from '@src/store/slices/sittingSlice/sittingSlice'

interface TourButtonProps {
  toWhat: string
}
const TourButton = ({ toWhat }: TourButtonProps) => {
  const dispatch = useAppDispatch()
  const handleTourOpen = () => {
    if (toWhat === 'posts') {
      dispatch(togglePostsTour())
    } else if (toWhat === 'editor') {
      dispatch(toggleEditorTour())
    }
  }
  return (
    <Tooltip color={'#4f68c7'} title={<p style={{ fontSize: '12px' }}>Take A Tour</p>}>
      <button onClick={() => handleTourOpen()} className="tour-button">
        <FaQuestion />
      </button>
    </Tooltip>
  )
}

export default TourButton
