import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@src/components/Button/Button'
import { isValidToken } from '@src/helpers/helpersFunc'
import InputField from '@src/components/InputField/InputField'

import { listOfFilds } from './content/validation'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'

const Settings = () => {
  const formik = useFormik({
    initialValues: {
      endpoint: '',
      endpointRefresh: '',
      accessToken: '',
      refreshToken: '',
      tokenName: '',
      pathOfData: '',
      pathToNumberDocs: '',
      pageParams: '',
      pageSizeParams: '',
      pathToTokenPayloadId: '',
    },
    validationSchema: Yup.object({
      endpoint: Yup.string().trim().required('user api is required').min(8, 'invalid api'),
      tokenName: Yup.string()
        .trim()
        .required('token name is required')
        .min(2, 'invalid token name'),
      pathToNumberDocs: Yup.string()
        .trim()
        .required('pathToNumberDocs is required')
        .min(2, 'invalid pathToNumberDocs'),
      pageSizeParams: Yup.string()
        .trim()
        .required('pageSizeParams is required')
        .min(2, 'invalid pageSizeParams'),
      pageParams: Yup.string()
        .trim()
        .required('pageParams is required')
        .min(2, 'invalid pageParams'),
      pathOfData: Yup.string()
        .trim()
        .required('Path to Id is required')
        .min(2, 'invalid path to Id'),
      pathToTokenPayloadId: Yup.string()
        .trim()
        .required('Path to token payload id is required')
        .min(2, 'invalid Path to token payload id'),
      accessToken: Yup.string()
        .trim()
        .required('access token is required')
        .test('accessToken', 'invalid access token', isValidToken),
    }),
    onSubmit: async (values) => {},
  })

  return (
    <form className="script-container" onSubmit={formik.handleSubmit}>
      {status && <LazyLoad />}
      <div className="script-container-title">
        <h1>Your Script</h1>
      </div>
      <div className="script-aria"></div>
      {listOfFilds.map(
        (el: { name: string; pholder: string; label: string; required: boolean }, key: number) => {
          return (
            <InputField
              key={key}
              formik={formik}
              field={{
                class: 'sitting-field',
                name: el?.name,
                type: 'text',
                placeholder: el?.pholder,
                label: el?.label,
                redStar: el?.required ? '*' : '',
              }}
            />
          )
        },
      )}
      <Button type="submit" className="submit-sittting-btn">
        Submit
      </Button>
    </form>
  )
}
export default Settings
