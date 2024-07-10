import { useAppDispatch } from '@src/store'
import { toggleCrudForm } from '@src/store/slices/sittingSlice/sittingSlice'
const Overlay = () => {
  const dispatch = useAppDispatch()
  return <div onClick={() => dispatch(toggleCrudForm())} className="overlay"></div>
}

export default Overlay
