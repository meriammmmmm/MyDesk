import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import Button from '@src/components/Button/Button'
import { RootState, useAppDispatch } from '@store/index'
import { useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { isValidToken } from '@src/helpers/helpersFunc'
import { handleCopy } from '@src/helpers/helpersFunc'
import InputField from '@src/components/InputField/InputField'
import { IoMdCopy } from 'react-icons/io'
import { saveSettingToOurDB, testUserEndpoint } from '@store/slices/sittingSlice/sittingThunk'
import { listOfFilds } from './content/validation'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'
import { getYourSettings } from '../../store/slices/sittingSlice/sittingThunk'

const Settings = () => {
  const dispatch = useAppDispatch()
  const { domainData } = useSelector((state: RootState) => state.auth)
  const { status } = useSelector((state: RootState) => state.sitting)

  // const sittingsAttr = getSettingValuesFromLocalStorage()
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
      // endpointRefresh: Yup.string().trim().required('refresh api is required').min(8, 'invalid api'),
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
      // refreshToken: Yup.string().trim().required('refresh token is required').test('refreshToken','invalid refresh token',isValidToken)
    }),
    onSubmit: async (values) => {
      dispatch(
        testUserEndpoint({
          endpoint: values?.endpoint,
          token: values?.accessToken,
          tokenName: values?.tokenName,
          pathOfData: values?.pathOfData,
          pathToNumberDocs: values?.pathToNumberDocs,
          pageParams: values?.pageParams,
          pageSizeParams: values?.pageSizeParams,
          pathToTokenPayloadId: values?.pathToTokenPayloadId,
        }),
      ).then((res: any) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(
            saveSettingToOurDB({
              userApi: values?.endpoint,
              tokenName: values?.tokenName,
              accessToken: values?.accessToken,
              pathToId: values?.pathOfData,
              pathToTotalDocs: values?.pathToNumberDocs,
              PageParams: values?.pageParams,
              pageSizeParams: values?.pageSizeParams,
              pathToTokenid: values?.pathToTokenPayloadId,
            }),
          )
        }
      })
    },
  })
  const [scriptValue, _setScriptValue] = useState(domainData?.script)
  useEffect(() => {
    dispatch(getYourSettings()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        const settingData = res?.payload?.data?.docs[0]
        formik.setValues({
          endpoint: settingData?.userApi || '',
          endpointRefresh: '',
          accessToken: settingData?.accessToken || '',
          refreshToken: '',
          tokenName: settingData?.tokenName || '',
          pathOfData: settingData?.pathToId || '',
          pathToNumberDocs: settingData?.pathToTotalDocs || '',
          pageParams: settingData?.PageParams || '',
          pageSizeParams: settingData?.pageSizeParams || '',
          pathToTokenPayloadId: settingData?.pathToTokenid || '',
        })
      }
    })
  }, [dispatch])
  return (
    <form className="script-container" onSubmit={formik.handleSubmit}>
      {status && <LazyLoad />}
      <div className="script-container-title">
        <h1>Your Script</h1>
      </div>
      <div className="script-aria">
        <TextArea
          className="script-text-aria"
          value={scriptValue || 'this is the script...'}
          rows={3}
          maxLength={6}
        />
        <IoMdCopy className="copy-script-icon" onClick={() => handleCopy(scriptValue, 'script')} />
      </div>
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
