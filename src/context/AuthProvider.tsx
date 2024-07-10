import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axiosInstance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { clearTokens, getTokens } from '../utils/token'
import useIsMountedRef from '../hook/useIsMountedRef'
import { RootState } from '@src/store'
import Loader from '@src/components/Loader/Loader'
import { initialise } from '@src/store/slices/auth/authSlice'
import supabase from '@src/services/supabase'

interface AuthProviderProps {
  children: React.ReactNode
}

interface JwtPayload {
  exp: number
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef()
  const { isInitialised } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const isValidToken = (token: string) => {
    const decoded: JwtPayload = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  }

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    async function fetchUser() {
      const { refresh_token } = getTokens()

      if (refresh_token) {
        try {
          const response = await supabase.auth.getUser()
          const user = response.data
          dispatch(initialise({ isAuthenticated: true, user }))
        } catch (error) {
          console.error('Failed to fetch user data:', error)
          dispatch(initialise({ isAuthenticated: false, user: null }))
          clearTokens()
        }
      } else {
        dispatch(initialise({ isAuthenticated: false, user: null }))
        clearTokens()
      }
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isInitialised) {
    return <Loader />
  }

  return <>{children}</>
}

export default AuthProvider
