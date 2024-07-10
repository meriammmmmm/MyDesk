import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from '@components/InputField/InputField'
import { useAppDispatch } from '@store/index'
import Button from '@src/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import Input from '@src/components/LoginInput/LoginInput'
import { updatePassword } from '@src/store/slices/auth/authThunk'

interface PasswordUpdateProp {
  isReset: boolean
  token?: string | null
}

const PasswordUpdate = ({ token, isReset }: PasswordUpdateProp) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      ...(isReset ? {} : { oldPassword: '' }),
      ...(!token ? {} : { token: token }),
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      ...(isReset
        ? {}
        : {
            oldPassword: Yup.string()
              .required('Old Password is required')
              .min(8, 'Password must be at least 8 characters')
              .max(20, 'Old Password must be less or equal to 20 characters'),
          }),

      password: Yup.string()
        .required('New Password is required')
        .min(6, 'New Password is too weak!')
        .max(20, 'Password must be less or equal to 20 characters'),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Password must match')
        .required('Confirm New Password is required')
        .max(20, 'Confirm Password must be less or equal to 20 characters'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          updatePassword({
            oldPassword: isReset ? undefined : values.oldPassword,
            password: values.password,
            token: token || undefined,
          }),
        )

        if (updatePassword.fulfilled.match(resultAction)) {
          navigate('/login') // Redirect upon successful update
        } else {
          alert('Failed to update password') // Handle failure scenario
        }
      } catch (error: any) {
        console.error('Dispatch updatePassword failed:', error.message)
        if (error.message === 'User not authenticated or session expired') {
          alert('Your session has expired. Please log in again.') // Provide specific session expired message
          // Optionally, redirect to login page or handle logout
        } else {
          alert('Failed to update password: ' + error.message) // Generic error handling with specific error message
        }
      }
    },
  })

  return (
    <form className="login-card-container" onSubmit={formik.handleSubmit}>
      <div className="password-update-fields">
        {!isReset && (
          <Input
            formik={formik}
            name="oldPassword"
            type="password"
            placeholder="Enter your old Password"
            label="Old Password"
            className="input"
          />
        )}
        <Input
          className="input"
          formik={formik}
          name="password"
          type="password"
          placeholder="Enter your new Password"
          label="New Password"
        />
        <Input
          formik={formik}
          name="confirmPassword"
          type="password"
          placeholder="Confirm your New Password"
          label="Confirm New Password"
        />
      </div>
      <Button className="login-button" size="xl" type="submit" label="Restore" />
    </form>
  )
}

export default PasswordUpdate
