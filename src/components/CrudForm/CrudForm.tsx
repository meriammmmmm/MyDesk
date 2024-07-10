import React, { useEffect } from 'react'
import { Drawer } from 'antd'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import EditInputField from '../EditInputField/EditInputField'
import { Can } from '@src/casl/Can'
import { editUser, fetchUsers } from '@src/store/slices/users/userThunk'
import { RootState, useAppDispatch } from '@src/store'
import image from '../../assets/images/avatr.png'

interface CrudFormProps {
  id: string
  visible: boolean
  onClose: () => void
  initialValues: any
}

const CrudForm: React.FC<CrudFormProps> = ({ id, visible, onClose, initialValues }) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.users.user)

  useEffect(() => {
    formik.setValues(initialValues)
    return () => {
      formik.resetForm()
    }
  }, [initialValues, id])

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        ...values,
        status: values.status === 'active' ? true : false,
      }
      dispatch(editUser(payload))
      onClose()
      dispatch(fetchUsers)
    },
  })

  const getStatusStyle = (status: string) => {
    if (status === 'active') {
      return { backgroundColor: '#D1FADF', color: '#027A48' }
    } else if (status === 'offline') {
      return { backgroundColor: '#FEE4E2', color: '#F04438' }
    } else {
      return {}
    }
  }

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className="drawer-header">
        <img src={image} alt="User Avatar" className="user-avatar" />
        <div className="user-details">
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
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
          <div className="editFormStatus">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              style={{
                ...getStatusStyle(formik.values.status),
                width: '83px',
                height: '34px',
                padding: '8px',
                borderRadius: '16px',
                border: '1px solid #ccc',
                marginBottom: '14px',
              }}
              className="crud-form-field"
            >
              <option value="active">Active</option>
              <option value="offline">Offline</option>
            </select>
          </div>
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

export default CrudForm
