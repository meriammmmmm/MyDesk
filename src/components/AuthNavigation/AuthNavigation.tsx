import { useNavigate } from 'react-router-dom'

interface ForgetPasswordProp {
  forWhat: string
}
const AuthNavigation = ({ forWhat }: ForgetPasswordProp) => {
  const navigate = useNavigate()
  return (
    <div className="forget-password">
      {forWhat === 'login' ? (
        <>
          <div className="forget-password-link">
            <div onClick={() => navigate('/forget-password')}>Forgot password?</div>
          </div>
        </>
      ) : (
        <>
          <nav>
            <span>Already have an account.</span>
            <div onClick={() => navigate('/login')}>Login?</div>
          </nav>
        </>
      )}
    </div>
  )
}

export default AuthNavigation
