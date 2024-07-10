import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
// import { Select } from 'antd'
import { useAppDispatch } from '@store/index'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { decreaseTime, increaseTime } from '@src/store/slices/popup/popupSlice'
const Behavior = () => {
  const dispatch = useAppDispatch()
  const { behavior } = useSelector((state: RootState) => state.rules)
  const { popupTime } = useSelector((state: RootState) => state.popup)
  // const optionsFrom = [
  //   { value: '3', label: '3 seconds' },
  //   { value: '5', label: '5 seconds' },
  //   { value: '7', label: '7 seconds' },
  // ]
  return (
    <section className="behavior-content-container">
      <div className="behavior-content-description">
        <p>After X Seconds:</p>
        <span>
          Show the poup when a visitor has viewed you website content after a particular time.
        </span>
      </div>
      {/* <div className="behavior-content-show-when">
        <span className="behavior-content-title">Show when</span>
        <Select
          disabled={behavior}
          defaultValue={{ label: 'Time On page' }}
          style={{ width: '100%' }}
          options={optionsFrom}
        />
      </div> */}
      {/* <div className="behavior-content-querry">
        <span className="behavior-content-title">Querry</span>
        <div className="querry-changer">
          <span>Is at least</span>
        </div>
      </div> */}
      <div className="behavior-content-time">
        <span className="behavior-content-title">Time (minute)</span>
        <div className="time-changer">
          <MdOutlineKeyboardArrowLeft
            onClick={() => (behavior ? dispatch(decreaseTime()) : null)}
          />
          <span>{popupTime}</span>
          <MdOutlineKeyboardArrowRight
            onClick={() => (behavior ? dispatch(increaseTime()) : null)}
          />
        </div>
      </div>
    </section>
  )
}

export default Behavior
