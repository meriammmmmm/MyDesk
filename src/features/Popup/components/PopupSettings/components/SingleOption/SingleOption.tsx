import { updatePopupSettings } from '@src/store/slices/contentSlice/contentSlice.slice'
import { useAppDispatch } from '@store/index'
import { ReactComponent as Choise } from '@assets/icons/popup/choise.svg'

const SingleOption = ({ icon, value, propertie, isActive, setIsCustomWithOpen }: any) => {
  const dispatch = useAppDispatch()

  const handleUpdatePopupSettings = () => {
    dispatch(updatePopupSettings({ propertie, value }))
    setIsCustomWithOpen(false)
  }
  return (
    <div
      onClick={handleUpdatePopupSettings}
      className={`single-option ${value} ${isActive === value && `option-active`}`}
    >
      {isActive === value && <Choise className={`icon-active ${value}`} />}
      <div>
        {icon}
        <p>{value}</p>
      </div>
    </div>
  )
}

export default SingleOption
