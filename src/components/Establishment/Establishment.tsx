import InputField from '../InputField/InputField'

const Establishment = ({ formData, setFormData }: any) => {
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <section className="Establishment-Section">
      <InputField
        field={{
          name: 'fullName',
          type: 'text',
          placeholder: 'Enter full name',
          label: 'Full Name',
          class: 'crud-form-field',
          redStar: '*',
        }}
        value={formData.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
      />
      <InputField
        field={{
          type: 'text',
          name: 'username',
          placeholder: 'Enter username',
          label: 'Username',
          redStar: '*',
          class: 'crud-form-field',
        }}
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
      />
      <InputField
        field={{
          type: 'text',
          name: 'email',
          placeholder: 'Enter Email',
          label: 'Email',

          class: 'crud-form-field',
        }}
        disabled
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
    </section>
  )
}

export default Establishment
