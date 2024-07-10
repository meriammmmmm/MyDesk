import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useNavigate } from 'react-router-dom'
import { toggleTargetClient } from '@src/store/slices/sittingSlice/sittingSlice'
import { BiTargetLock } from 'react-icons/bi'
import { isTokenOfClientValid } from '@src/utils/checkTokenOfClient'
import { useEffect } from 'react'
import { getYourSettings } from '@src/store/slices/sittingSlice/sittingThunk'
import { setAttributesToStorage } from '@store/slices/sittingSlice/helperFunc'
import Filter from '@src/components/Filter/Filter'
import { extractLabels } from '@src/utils/manageObject'
const TargetClient = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isTargetClientOpen } = useSelector((state: RootState) => state.sitting)
  const { audience } = useSelector((state: RootState) => state.rules)
  const { guestFilters } = useSelector((state: RootState) => state.clientFilter)

  const handleToggleTargetClient = () => {
    dispatch(toggleTargetClient())
  }
  useEffect(() => {
    dispatch(getYourSettings()).then((res: any) => {
      const {
        pageSizeParams,
        pathToId,
        pathToTokenid,
        tokenName,
        pathToTotalDocs,
        userApi,
        accessToken,
        PageParams,
      } = res?.payload?.data?.docs[0]
      setAttributesToStorage({
        endpoint: userApi,
        pathOfData: pathToId,
        token: accessToken,
        pageParams: PageParams,
        pageSizeParams,
        pathToNumberDocs: pathToTotalDocs,
        pathToTokenPayloadId: pathToTokenid,
        tokenName,
      })
    })
  }, [])

  return (
    <div className="targetClient-container">
      <div className="targetClient-toggled-container" onClick={handleToggleTargetClient}>
        <nav>
          <BiTargetLock />
          <p className="targetClient-toggled-title">Target Client</p>
          <span>{extractLabels(guestFilters) || 'No target'}</span>
        </nav>
        {isTargetClientOpen && !audience ? (
          <MdKeyboardArrowUp className="arrow-down-toggle" />
        ) : (
          <MdKeyboardArrowDown className="arrow-down-toggle" />
        )}
      </div>
      <div className={`targetClient-content ${!isTargetClientOpen && 'toggled'}`}>
        {!isTokenOfClientValid() ? (
          <p className="link-to-settings">
            Access the Settings menu to configure and enable this feature{' '}
            <span onClick={() => navigate('/settings')} className="settings-link">
              settings.
            </span>
          </p>
        ) : (
          <Filter forWhat={'onlyFilter'} />
        )}
      </div>
    </div>
  )
}

export default TargetClient
