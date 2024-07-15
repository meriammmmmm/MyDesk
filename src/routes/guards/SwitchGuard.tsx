import { useEffect } from 'react'
import { Spin } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { isValidToken } from '@src/helpers/helpersFunc'

const SwitchGuard = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const [searchParams, _setSearchParams] = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    if (isAuthenticated) {
      if (isValidToken(token)) {
      }
      navigate('/dashboard')
    } else {
      navigate(isValidToken(token) ? '/login?token=' + token : '/login')
    }
  }, [])

  return (
    <div>
      <Spin />
    </div>
  )
}

export default SwitchGuard
