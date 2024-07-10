import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAppDispatch } from '@src/store'
import { Input } from 'antd'

import {
  getAllFilters,
  postFilter,
  testFilterEndpoint,
} from '@store/slices/clientFilter/clientFilterThunk'
import Button from '@src/components/Button/Button'

const ClientFilterItem = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      filterType: 'select',
      filterLabel: '',
      ...(type === 'boolean' ? {} : { apiUrlValue: '' }),
      searchParams: '',
      ...(type === 'boolean' ? {} : { pathToDescription: '' }),
    },
    validationSchema: Yup.object({
      filterLabel: Yup.string().trim().required('filterLabelis required'),
      ...(type === 'boolean'
        ? {}
        : { apiUrlValue: Yup.string().trim().required('apiUrlValue is required') }),
      searchParams: Yup.string().trim().required('searchParamsis required'),
      ...(type === 'boolean'
        ? {}
        : { pathToDescription: Yup.string().trim().required('pathToDescriptionis required') }),
    }),
    onSubmit: (values) => {
      dispatch(
        testFilterEndpoint({
          apiUrlValue: values?.apiUrlValue,
          searchParams: values?.searchParams,
        }),
      ).then((res: any) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          dispatch(postFilter({ values })).then((_res: any) => {
            dispatch(getAllFilters())
          })
        }
      })
    },
  })

  return (
    <div className="client-filter-item-container">
      <form onSubmit={formik.handleSubmit} className="client-filter-items">
        <div className="client-filter-item-section">
          <label>Filter label:</label>
          <Input
            name="filterLabel"
            value={formik?.values?.filterLabel}
            onChange={formik.handleChange}
            placeholder="Enter The Filter label..."
          />
          {formik.touched?.filterLabel && formik.errors?.filterLabel ? (
            <p className="erorrs-filter">{formik.errors?.filterLabel}</p>
          ) : null}
        </div>
        {type === 'select' && (
          <div className="client-filter-item-section">
            <label>Endpoint:</label>
            <Input
              name="apiUrlValue"
              value={formik?.values?.apiUrlValue}
              onChange={formik.handleChange}
              placeholder="Enter The endpoint..."
            />
            {formik.touched?.apiUrlValue && formik.errors?.apiUrlValue ? (
              <p className="erorrs-filter">{formik.errors?.apiUrlValue}</p>
            ) : null}
          </div>
        )}
        <div className="client-filter-item-section">
          <label>Search Params:</label>
          <Input
            name="searchParams"
            value={formik?.values?.searchParams}
            onChange={formik.handleChange}
            placeholder="Enter The Search Params..."
          />
          {formik.touched?.searchParams && formik.errors?.searchParams ? (
            <p className="erorrs-filter">{formik.errors?.searchParams}</p>
          ) : null}
        </div>
        {type === 'select' && (
          <div className="client-filter-item-section">
            <label>Path to Name or description:</label>
            <Input
              name="pathToDescription"
              value={formik?.values?.pathToDescription}
              onChange={formik.handleChange}
              placeholder="Enter Path to Name..."
            />
            {formik.touched?.pathToDescription && formik.errors?.pathToDescription ? (
              <p className="erorrs-filter">{formik.errors?.pathToDescription}</p>
            ) : null}
          </div>
        )}
        <div className="client-filter-item-section">
          <Button type={'submit'} className={'test-api-btn'}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ClientFilterItem
