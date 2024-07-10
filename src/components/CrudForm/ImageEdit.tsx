import React, { useEffect } from 'react'
import { Drawer } from 'antd'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import EditInputField from '../EditInputField/EditInputField'
import { Can } from '@src/casl/Can'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'
import { editUser, fetchUserById } from '@src/store/slices/users/userThunk'
import { RootState, useAppDispatch } from '@src/store'
import { fetchImageById } from '@src/store/slices/images/imageThunk'

interface CrudFormProps {
  id: string
  visible: boolean
  onClose: () => void
}

const ImageEdit: React.FC<CrudFormProps> = ({ id, visible, onClose }) => {
  const dispatch = useAppDispatch()
  const image = useSelector((state: RootState) => state.images)
  const [loading, setLoading] = React.useState(true)
  console.log(image)

  useEffect(() => {
    if (id) {
      dispatch(fetchImageById(id)).then(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [id, dispatch])

  const formik = useFormik({
    initialValues: image || {
      name: '',
      email: '',
      password: '',
      lastname: '',
      organization: '',
      lastsession: '',
      last_login_time: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(editUser(values))
    },
  })

  if (loading) return <LazyLoad />

  return (
    <Drawer title="Edit User" placement="right" visible={visible} onClose={onClose}>
      <div className="crud-form-popup">
        <form onSubmit={formik.handleSubmit}>
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'name',
              type: 'text',
              placeholder: 'Enter username',
              label: 'Username',
              class: 'crud-form-field',
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'email',
              type: 'email',
              placeholder: 'Enter email',
              label: 'Email',
              class: 'crud-form-field',
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'password',
              type: 'password',
              placeholder: 'Enter your password',
              label: 'Password',
              class: 'crud-form-field',
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'lastname',
              type: 'text',
              placeholder: 'Enter your lastname',
              label: 'Lastname',
              class: 'crud-form-field',
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'organization',
              type: 'text',
              placeholder: 'Enter your organization',
              label: 'Organization',
              class: 'crud-form-field',
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'lastsession',
              type: 'text',
              placeholder: 'Enter your last session',
              label: 'Last Session',
              class: 'crud-form-field',
            }}
          />
          <Can I="create" a="domain">
            <EditInputField
              className="editForm"
              formik={formik}
              field={{
                name: 'last_login_time',
                type: 'text',
                placeholder: 'Enter your Last Login Time',
                label: 'Last Login Time',
                class: 'crud-form-field',
              }}
            />
          </Can>
          <Button
            type="submit"
            style={{
              width: '100%',
              fontSize: '17px',
              marginTop: '30px',
              backgroundColor: '#506bcc',
            }}
            size="xl"
          >
            Submit
          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default ImageEdit
