import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import desktop from '../../assets/images/loginImage.png'
import { useAppDispatch } from '@src/store'
import { getChangedValues } from '@src/utils/getChangedValuesFormik'
import { login } from '@src/store/slices/auth/authThunk'
import Input from '@src/components/LoginInput/LoginInput'
import Button from '@src/components/Button/Button'
import { PATH } from '../../routes/paths'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel, FormGroup } from '@mui/material'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useAppDispatch()

  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required').min(6, 'Password is too short!'),
    }),
    onSubmit: (values) => {
      setSubmitting(true)
      const changedValues = getChangedValues(values, initialValues)
      dispatch(login(changedValues))
        .unwrap()
        .then(() => {})
        .catch((err) => {
          alert(err || 'something-went-wrong')
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <div className="auth-view">
      <div>
        {' '}
        <div className="image-bloc">
          <img className="" src={logo} />
          <p className="login-description">
            {' '}
            Empower Your Workforce with a <span> Cloud Computer</span>{' '}
          </p>
          <img className="image-desktop" src={desktop} />
          <p className="login-footer">© All Rights Reserved softylines.com</p>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-header">
          <h1>Log in</h1>
          <p>Welcome back! Please enter your details.</p>
        </div>

        <form className="login-card-container" onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            formik={formik}
            variant="secondary"
            placeholder="Enter your username"
            label="Email"
            className="input"
          />

          <Input
            name="password"
            formik={formik}
            variant="secondary"
            placeholder="Enter your password"
            label="Password"
            type="password"
            className="input"
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
            </FormGroup>

            <Link to={PATH.FORGETPASSWORD} className="link">
              Forget password?{' '}
            </Link>
          </div>
          <Button className="login-button" label={'Login'} type={'submit'} loading={submitting} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4rem',
            }}
          >
            <p>
              Or connect with <span className="ldap">LDAP</span>
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p className="link">Don’t have an account? </p>
              <Link to={PATH.REGISTER} className="ldap">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
