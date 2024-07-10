import loginimg from '@src/assets/images/auth/loginimg.svg'
import { BsFillShieldLockFill } from 'react-icons/bs'
import PasswordUpdate from '@src/features/Profile/components/PasswordUpdate/PasswordUpdate'
import { useLocation } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png'
import desktop from '../../../../assets/images/Group 11.png'
const ResetPassword = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  return (
    <div className="auth-view">
      <div className="image-bloc">
        <img className="" src={logo} />
        <p className="login-description">
          {' '}
          Empower Your Workforce with a <span> Cloud Computer</span>{' '}
        </p>
        <img className="image-desktop" src={desktop} />
        <p className="login-footer">© All Rights Reserved softylines.com</p>
      </div>
      <div className="auth-content">
        <div className="auth-header">
          <h1>Reset your Password </h1>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <PasswordUpdate token={token} isReset={true} />
      </div>
    </div>
  )
}
export default ResetPassword
