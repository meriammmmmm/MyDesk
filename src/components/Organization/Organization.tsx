import React from 'react'
import { Upload, Button, message } from 'antd'
import InputField from '../InputField/InputField'

const Organization = ({ formData, setFormData }: any) => {
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }
  console.log(formData)

  return (
    <section className="Establishment-Section">
      <div className="create-container">
        <InputField
          field={{
            type: 'text',
            name: 'id',
            placeholder: 'Enter id',
            label: 'Id',
            redStar: '*',
            class: 'crud-form-field',
          }}
          value={formData.id}
          disabled
          onChange={(e) => handleChange('id', e.target.value)}
        />
        <InputField
          field={{
            name: 'Owner',
            type: 'text',
            placeholder: 'Enter Owner',
            label: 'Owner',
            class: 'crud-form-field',
            redStar: '*',
          }}
          value={formData.organization}
          onChange={(e) => handleChange('organization', e.target.value)}
        />
      </div>
      <div className="create-container">
        <InputField
          field={{
            type: 'text',
            name: 'organizationName',
            placeholder: 'Enter Name',
            label: 'Name',
            redStar: '*',
            class: 'crud-form-field',
          }}
          value={formData.organizationName}
          onChange={(e) => handleChange('organizationName', e.target.value)}
        />
        <InputField
          field={{
            name: 'address',
            type: 'text',
            placeholder: 'Enter Address',
            label: 'Address',
            class: 'crud-form-field',
            redStar: '*',
          }}
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </div>
    </section>
  )
}

export default Organization
