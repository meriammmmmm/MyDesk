import React, { useState } from 'react'
import InputField from '../InputField/InputField'
import PasswordStrengthMeter from './PasswordStrengthMeter'
import supabase from '@src/services/supabase'

const Password = ({ formData, setFormData }: any) => {
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState('')

  const handleChangeNewPassword = (field: string, value: string | any[]) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    const strength = value.length
    setPasswordStrength(strength)
  }

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const validateCurrentPassword = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.currentPassword,
    })
    return !error
  }

  const handleSubmit = async () => {
    // Validate current password
    const isCurrentPasswordValid = await validateCurrentPassword()
    if (!isCurrentPasswordValid) {
      setCurrentPasswordError('Wrong current password')
      return
    } else {
      setCurrentPasswordError('')
    }

    // Check if new password matches confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordMatchError('New password and confirm password do not match')
      return
    } else {
      setPasswordMatchError('')
    }

    // Update password using Supabase
    const { error } = await supabase.auth.updateUser({
      password: formData.newPassword,
    })

    if (error) {
      setUpdateSuccess('Error updating password')
    } else {
      setUpdateSuccess('Password updated successfully')
    }
  }

  return (
    <section className="Password-Section">
      <InputField
        field={{
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Enter current password',
          label: 'Current Password',
          class: 'crud-form-field',
        }}
        value={formData.currentPassword}
        onChange={(e) => handleChange('currentPassword', e.target.value)}
      />
      {currentPasswordError && <p style={{ color: 'red' }}>{currentPasswordError}</p>}

      <InputField
        field={{
          name: 'newPassword',
          type: 'password',
          placeholder: 'Enter new password',
          label: 'New Password',
          class: 'crud-form-field',
        }}
        value={formData.newPassword}
        onChange={(e) => handleChangeNewPassword('newPassword', e.target.value)}
      />
      <PasswordStrengthMeter strength={passwordStrength} />

      <InputField
        field={{
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm new password',
          label: 'Confirm Password',
          class: 'crud-form-field',
        }}
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
      />
      {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}

      <button className="edit-profile-button" onClick={handleSubmit}>
        Confirm
      </button>
      {updateSuccess && <p>{updateSuccess}</p>}
    </section>
  )
}

export default Password
