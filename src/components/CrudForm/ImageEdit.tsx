import React, { useEffect } from 'react'
import { Drawer, Select } from 'antd'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import EditInputField from '../EditInputField/EditInputField'
import { Can } from '@src/casl/Can'
import { editUser, fetchUsers } from '@src/store/slices/users/userThunk'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import image from '../../assets/images/avatr.png'
import { fetchImageGroupe } from '@src/store/slices/imageGroupe/imageGroupeThunk'
import { PatchImages } from '@src/store/slices/images/imageThunk'

interface CrudFormProps {
  id: string
  visible: boolean
  onClose: () => void
  initialValues: any
  isViewMode: boolean
}

const CrudForm: React.FC<CrudFormProps> = ({ id, visible, onClose, initialValues, isViewMode }) => {
  const dispatch = useAppDispatch()
  const image = useSelector((state: RootState) => state.images.image)
  const { Option } = Select

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
      dispatch(PatchImages(payload))
      onClose()
      dispatch(fetchUsers)
    },
  })
  const sectionsData = [
    { id: 1, label: 'Communication' },
    { id: 2, label: 'Desktop' },
    { id: 3, label: 'Games' },
    { id: 4, label: 'Office' },
    { id: 5, label: 'Multimedia' },
    { id: 6, label: 'Chat' },
    { id: 7, label: 'Privacy' },
  ]

  const tagOptions = sectionsData.map((el) => ({ label: el.label, value: el.label }))

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
        <img src={image.image} alt="User Avatar" className="user-avatar" />
        <div className="user-details">
          <div>{image.name}</div>
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
              disabled: isViewMode,
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'dockerImage',
              type: 'text',
              placeholder: 'Enter dockerImage',
              label: 'dockerImage',
              class: 'crud-form-field',
              disabled: isViewMode,
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'logoUrl',
              type: 'text',
              placeholder: 'Enter your logoUrl',
              label: 'logoUrl',
              class: 'crud-form-field',
              disabled: isViewMode,
            }}
          />
          <EditInputField
            className="editForm"
            formik={formik}
            field={{
              name: 'description',
              type: 'text',
              placeholder: 'Enter description',
              label: 'Description',
              class: 'crud-form-field',
              disabled: isViewMode,
            }}
          />{' '}
          <div className="editFormUsers">
            <label htmlFor="Tags">Tags</label>
            <Select
              id="tag"
              mode="multiple"
              allowClear
              style={{ width: '100%', margin: '1rem' }}
              placeholder="Select tags"
              onChange={(value) => formik.setFieldValue('tag', value)}
              onBlur={formik.handleBlur}
              value={formik.values.tag}
              disabled={isViewMode}
            >
              {tagOptions?.map((tag: any) => (
                <Option key={tag.id} value={tag.label}>
                  {tag.label}
                </Option>
              ))}
            </Select>
          </div>
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
              disabled={isViewMode}
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
                disabled: isViewMode,
              }}
            />
          </Can>
          {!isViewMode && (
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
          )}
        </form>
      </div>
    </Drawer>
  )
}

export default CrudForm
