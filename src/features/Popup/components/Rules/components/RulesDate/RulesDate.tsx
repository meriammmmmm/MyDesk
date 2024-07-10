import { BiFlag } from 'react-icons/bi'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import type { RangePickerProps } from 'antd/es/date-picker'
import { useAppDispatch } from '@store/index'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { addedEndDate, addedStartDate } from '@src/store/slices/popup/popupSlice'

const RulesDate = () => {
  const { schedules } = useSelector((state: RootState) => state.rules)
  const dispatch = useAppDispatch()

  const onChangeEndDate = (startAndEnd: string[]) => {
    dispatch(addedStartDate(startAndEnd[0]))
    dispatch(addedEndDate(startAndEnd[1]))
  }
  const { RangePicker } = DatePicker

  const range = (start: number, end: number) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day')
  }

  const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    const now = dayjs()
    if (type === 'start') {
      return {
        disabledHours: () => range(0, now.hour()),
        disabledMinutes: () => range(0, now.minute()),
        disabledSeconds: () => range(0, now.second()),
      }
    }

    return {
      disabledHours: () => range(60, 0),
      disabledMinutes: () => range(60, 0),
    }
  }

  return (
    <div className="rules-date-container">
      <div className="rules-end-date">
        <div className="rules-end-date-label">
          <BiFlag />
          <p>Select Date</p>
        </div>
        <RangePicker
          disabledDate={disabledDate}
          disabledTime={disabledRangeTime}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
          }}
          onChange={(_value, dataString) => onChangeEndDate(dataString)}
          format="DD/MM/YYYY HH:mm"
          disabled={!schedules}
        />
      </div>
    </div>
  )
}

export default RulesDate
