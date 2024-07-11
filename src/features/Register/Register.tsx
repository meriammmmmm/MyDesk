import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import desktop from '../../assets/images/loginImage.png'
import { useAppDispatch } from '@src/store'
import { getChangedValues } from '@src/utils/getChangedValuesFormik'
import { register } from '@src/store/slices/auth/authThunk'
import Input from '@src/components/LoginInput/LoginInput'
import { PATH } from '@src/routes/paths'
import Button from '@src/components/Button/Button'
const initialValues = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
}

const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('FirstName is required'),

      email: Yup.string()
        .email('Invalid email address')
        .matches(
          /^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
          'Invalid email address',
        )
        .test(
          'no-special-chars',
          'Email contains disallowed characters',
          (value: string | undefined) => !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value),
        )
        .required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password is too short!'),
    }),
    onSubmit: (values) => {
      setSubmitting(true)
      const changedValues = getChangedValues(values, initialValues)
      dispatch(register(changedValues))
        .unwrap()
        .then(() => {})
        .catch((err) => {
          alert(err?.message || 'something-went-wrong')
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

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
          <h1>Sign Up</h1> <p>Welcome back! Please enter your details.</p>
        </div>
        <form className="register-card-container" onSubmit={formik.handleSubmit}>
          <Input
            name="fullName"
            formik={formik}
            variant="secondary"
            placeholder="Enter your firstname"
            label="Firstname"
            required={true}
          />

          <Input
            name="email"
            formik={formik}
            variant="secondary"
            placeholder="Enter your email"
            label="Email"
            type="email"
            required={true}
          />

          <Input
            name="phone"
            formik={formik}
            variant="secondary"
            placeholder="00000"
            label="Phone Number"
            type="number"
            required={true}
          />
          <Input
            name="password"
            formik={formik}
            variant="secondary"
            placeholder="Enter your password"
            label="Password"
            type="password"
            required={true}
          />

          <Button
            className="login-button"
            label={'Register'}
            type={'submit'}
            loading={submitting}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p className="link">Already have an account? </p>
            <Link to={PATH.LOGIN} className="ldap">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
