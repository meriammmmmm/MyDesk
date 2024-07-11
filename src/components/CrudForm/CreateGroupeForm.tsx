import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Checkbox from '@mui/joy/Checkbox'
import React, { useEffect, useState } from 'react'
import InputField from '../InputField/InputField'
import SelectComp from '../SelectComp/SelectComp'
import plus from '../../assets/icons/plus.svg'
import { useAppDispatch, useAppSelector } from '@src/store'
import { addUserGroupe, fetchUserGroupe } from '@src/store/slices/userGroupe/userGroupeThunk'
import { fetchImages } from '@src/store/slices/images/imageThunk'
import { fetchUsers } from '@src/store/slices/users/userThunk'
import { message } from 'antd'
import Button from '../Button/Button'

const CreateGroupeForm = ({ onClosePopup }: { onClosePopup: () => void }) => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
    imageGroupe: [],
    users: [],
  })

  useEffect(() => {
    dispatch(fetchImages())
    dispatch(fetchUsers())
  }, [dispatch])

  const { images } = useAppSelector((state) => state.images)
  const { users } = useAppSelector((state) => state.users)

  const useroptions: any[] = users?.map((el: any) => ({
    label: `${el.name}`,
    value: `${el.name}`,
    image: `${el.image}`,
  }))

  const options: any[] = images?.map((el: any) => ({
    label: `${el.name}`,
    value: `${el.name}`,
    image: `${el.image}`,
  }))

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleFormChange = (newValues: any) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newValues,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    handleFormChange({ [name]: value })
  }

  const handleToggle = (value: string) => {
    setSelectedItems((prevSelected) => {
      const newSelected = [...prevSelected]
      const currentIndex = newSelected.indexOf(value)

      if (currentIndex === -1) {
        newSelected.push(value)
      } else {
        newSelected.splice(currentIndex, 1)
      }

      handleFormChange({ permissions: newSelected })
      return newSelected
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSubmit = {
      ...formData,
      permissions: selectedItems,
    }
    dispatch(addUserGroupe(dataToSubmit)).then(() => {
      onClosePopup()
      dispatch(fetchUserGroupe())
      message.success('usergroupe Created succfully')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        field={{
          name: 'name',
          type: 'text',
          placeholder: 'Enter your Group Name*',
          label: 'Group Name*',
          class: 'crud-form-field',
          redStar: '*',
        }}
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        field={{
          name: 'description',
          type: 'text',
          placeholder: 'Write a brief description...',
          label: 'Description*',
          redStar: '*',
          class: 'crud-form-field',
        }}
        value={formData.description}
        onChange={handleChange}
      />
      <div className="actions-create-groupe">
        <div className="actions-headers">
          <p>Actions</p>
          <img src={plus} alt="Add" />
        </div>
        <p>Permissions</p>
        <List
          sx={{
            minWidth: 240,
            '--List-gap': '0.5rem',
            '--ListItem-paddingY': '1rem',
            '--ListItem-radius': '8px',
            '--ListItemDecorator-size': '32px',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}
        >
          {['Create', 'Read', 'Update', 'Delete', 'Use', 'Launch'].map((item) => (
            <ListItem
              variant="outlined"
              key={item}
              sx={{
                boxShadow: 'sm',
                backgroundColor: selectedItems.includes(item) ? '#25C4F4' : 'inherit',
                color: selectedItems.includes(item) ? 'white' : 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => handleToggle(item)}
            >
              <Checkbox
                checked={selectedItems.includes(item)}
                onChange={() => handleToggle(item)}
                sx={{
                  flexGrow: 1,
                  flexDirection: 'row',
                  '& .MuiCheckbox-root': {
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    position: 'relative',
                  },
                  '& .MuiSvgIcon-root': {
                    display: 'none',
                  },
                  '& .Mui-checked::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    transform: 'translate(-50%, -50%)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: '3px solid',
                    borderColor: selectedItems.includes(item) ? 'white' : 'rgba(0, 0, 0, 0.54)',
                    transform: 'translate(-50%, -50%)',
                  },
                }}
              />
              <span style={{ color: selectedItems.includes(item) ? 'white' : 'inherit' }}>
                {item}
              </span>
            </ListItem>
          ))}
        </List>

        <SelectComp
          options={options}
          label="Assign to an image group"
          value={formData.imageGroupe}
          setValue={(value: any) => handleFormChange({ imageGroupe: value })}
        />

        <SelectComp
          options={useroptions}
          label="Assign to an image group"
          value={formData.users}
          setValue={(value: any) => handleFormChange({ users: value })}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          type="button"
          onClick={() => {
            onClosePopup()
          }}
          size="xl"
          className="cancel-button-form"
        >
          Cancel
        </Button>
        <Button className="submit-button-form" type="submit" size="xl" onClick={handleSubmit}>
          Confirm
        </Button>
      </div>{' '}
    </form>
  )
}

export default CreateGroupeForm
