import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, ColorPicker, Input, Modal, Space, Tag } from 'antd'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { createTags, deleteTags, getTags } from '@src/store/slices/tagsSlice/tagsThunk'
const FormTags = ({ isOpen, setIsOpen }: any) => {
  const dispatch = useAppDispatch()
  const { tags, addTags } = useAppSelector((state: RootState) => state.tagsList)
  const initialValues = {
    tag: '',
    color: '#1677ff',
  }
  const validationSchema = Yup.object({
    tag: Yup.string()
      .required('Name tag cannot be empty')
      .min(2, 'Tag name must have at least 2 characters.')
      .max(30, 'Tag name must have at max 30 characters.'),
  })
  const handleSubmit = async () => {
    dispatch(createTags({ name: formik.values.tag.toUpperCase(), color: formik.values.color }))
      .unwrap()
      .then(() => {
        formik.setFieldValue('tag', '')
        formik.setFieldValue('color', '#1677ff')
      })
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })
  const handleColorChange = (color: any) => {
    formik.setFieldValue('color', color.toHexString())
  }
  useEffect(() => {
    dispatch(getTags({}))
  }, [dispatch])

  const handleDelete = (el: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTags(el._id))
      }
    })
  }

  return (
    <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
      <form className="form-add-tags" onSubmit={formik.handleSubmit}>
        <Input
          id="tag"
          name="tag"
          placeholder="Add new tag"
          className="btn-add-tag"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.tag}
        />
        <ColorPicker value={formik.values.color} onChange={handleColorChange} />
        <Button className="btn-add-tag" htmlType="submit" disabled={addTags.status === 'loading'}>
          {addTags.status === 'loading' ? 'Loading...' : '+ Add'}
        </Button>
      </form>
      {formik.touched && formik.errors && (
        <p className="error-message-tag">{formik.errors['tag']}</p>
      )}
      {addTags.error && <p className="error-message-tag">{addTags.error}</p>}
      <div className="list-tags">
        {tags.content.map((el: any) => (
          <Tag bordered={false} color={el.color} key={el.name}>
            <Space>
              {el.name}
              <DeleteOutlined onClick={() => handleDelete(el)} style={{ cursor: 'pointer' }} />
            </Space>
          </Tag>
        ))}
      </div>
    </Modal>
  )
}

export default FormTags
