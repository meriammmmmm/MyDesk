import { useAppDispatch } from '@src/store'
import InputField from '@src/components/InputField/InputField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@src/store/index'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import loginimg from '@src/assets/images/auth/loginimg.svg'
import AuthNavigation from '@src/components/AuthNavigation/AuthNavigation'
import { Link, useNavigate } from 'react-router-dom'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'
import logo from '../../assets/images/logo.png'
import desktop from '../../assets/images/Group 11.png'
import Input from '@src/components/LoginInput/LoginInput'
import { resetPasswords } from '@src/store/slices/auth/authThunk'
import { PATH } from '@src/routes/paths'
const ForgetPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format.')
        .matches(emailRegex, 'Invalid email format.')
        .required('Email is required.'),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(resetPasswords({ email: values.email }))
      if (resetPasswords.fulfilled.match(resultAction)) {
        navigate('/reset-password')
      } else {
        alert('Failed to send reset email')
      }
    },
  })

  return (
    <div className="auth-view">
      <div className="image-bloc">
        <img src={logo} alt="Logo" />
        <p className="login-description">
          {' '}
          Empower Your Workforce with a <span> Cloud Computer</span>{' '}
        </p>
        <img className="image-desktop" src={desktop} alt="Desktop" />
        <p className="login-footer">© All Rights Reserved softylines.com</p>
      </div>
      <div className="auth-content">
        <div className="auth-header">
          <h1>Forgot Your Password? </h1>
          <p>Please enter your email to reset your password.</p>
        </div>
        <form className="login-card-container" onSubmit={formik.handleSubmit}>
          <Input
            formik={formik}
            name="email"
            type="text"
            variant="secondary"
            className="input"
            placeholder="Enter your email"
            label="Email"
          />
          <Button className="login-button" size="xl" type="submit" label="Reset Now" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '0.5rem',
            }}
          >
            <p className="link">Won’t to back login? </p>
            <Link to={PATH.LOGIN} className="ldap">
              Login form here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
