import React, { useState } from 'react'
import { VscEyeClosed, VscEye } from 'react-icons/vsc'

interface IFieldProps {
  name: string
  type: string
  placeholder: string
  label: string
  class?: string
  redStar?: string
}

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formik?: any
  field: IFieldProps
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputField: React.FC<IInputFieldProps> = ({ formik, field, onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    if (formik && formik.handleChange) {
      formik.handleChange(e)
    }
  }

  return (
    <div className={`input-field ${field.class}`}>
      <label htmlFor={field?.name}>
        {field?.label}
        <span>{field?.redStar}</span>
      </label>
      <div className="password-input-container">
        <input
          id={field?.name}
          name={field?.name}
          type={field?.type === 'password' ? (showPassword ? 'text' : field?.type) : field?.type}
          placeholder={field?.placeholder}
          onChange={handleChange}
          value={formik?.values[field?.name] || ''}
          className={formik?.touched[field?.name] && formik?.errors[field?.name] ? 'has-error' : ''}
          {...props}
        />
        {field?.type === 'password' && formik?.values[field?.name] && (
          <span className="password-toggle" onClick={handlePasswordVisibilityToggle}>
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        )}
      </div>
      {formik?.touched[field?.name] && formik?.errors[field?.name] && (
        <p className="error-message">{formik?.errors[field?.name]}</p>
      )}
    </div>
  )
}

export default InputField
