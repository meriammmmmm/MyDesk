import { useEffect } from 'react'
import { Spin } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { saveSettingToOurDB } from '@src/store/slices/sittingSlice/sittingThunk'
import { isValidToken } from '@src/helpers/helpersFunc'

const SwitchGuard = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const [searchParams, _setSearchParams] = useSearchParams()
  const token = searchParams.get('token')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    if (isAuthenticated) {
      if (isValidToken(token)) {
        dispatch(
          saveSettingToOurDB({
            accessToken: token,
          }),
        )
      }
      navigate('/dashboard')
    } else {
      navigate(isValidToken(token) ? '/login?token=' + token : '/login')
    }
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin />
    </div>
  )
}

export default SwitchGuard
