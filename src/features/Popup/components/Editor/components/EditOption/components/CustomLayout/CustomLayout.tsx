import { toggleCustomLayoutModel } from '@src/store/slices/customLayoutSlice/customLayoutSlice'
import { useAppDispatch, RootState } from '@store/index'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import LoadingComponent from './components/LoadingComponent/LoadingComponent'

const CustomLayout = () => {
  const { isCustomLayoutModelOpen } = useSelector((state: RootState) => state.customLayout)

  const dispatch = useAppDispatch()
  const handleCancel = () => {
    dispatch(toggleCustomLayoutModel())
  }
  const handleOk = async () => {
    dispatch(toggleCustomLayoutModel())
  }
  return (
    <Modal
      title={<p className="custom-layout-main-title">Click To Select Your Custom Layout:</p>}
      open={isCustomLayoutModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <LoadingComponent isReverse={false} />
      <LoadingComponent isReverse={true} />
    </Modal>
  )
}

export default CustomLayout
