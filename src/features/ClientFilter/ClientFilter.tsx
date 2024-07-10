import ClientFilterItem from './components/ClientFilterItem/ClientFilterItem'
// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'
// import { getAllFilters } from '../../store/slices/clientFilter/clientFilterThunk'
import { Popover, Button } from 'antd'
import TableData from '@src/components/TableData/TableData'

const ClientFilter = () => {
  const { status } = useSelector((state: RootState) => state.clientFilter)
  // useEffect(() => {
  //   dispatch(getAllFilters())
  // }, [])
  return (
    <section className="client-filter-container">
      {status && <LazyLoad />}
      <div className="client-filer-header">
        <p>Create Your Filters:</p>
        <div className="client-filter-header-btns">
          <Popover
            content={<ClientFilterItem type={'select'} />}
            title="Create Select Filter:"
            trigger="click"
          >
            <Button type="primary">Add Select Filer </Button>
          </Popover>
          <Popover
            content={<ClientFilterItem type={'boolean'} />}
            title="create Boolean Filter:"
            trigger="click"
          >
            <Button type="primary">Add Toggle Filer</Button>
          </Popover>
        </div>
      </div>
      <TableData
        data={[
          {
            _id: '987654321000',
            filterType: 'select',
            filterLabel: 'Division',
            endPoint: 'https://api.takiacademy.me/api/admin/divisions',
            search: 'division.id',
            pathToName: 'payload',
          },
          {
            _id: '123456789012',
            filterType: 'select',
            filterLabel: 'User group',
            endPoint: 'https://api.takiacademy.me/api/admin/groups',
            search: 'affiliations.group.id',
            pathToName: 'payload',
          },
          {
            _id: '6424623634298',

            filterType: 'select',
            filterLabel: 'State',
            endPoint: 'https://api.takiacademy.me/api/admin/1/states',
            search: 'state.id',
            pathToName: 'payload',
          },
          {
            _id: '6424623634232',

            filterType: 'boolean',
            filterLabel: 'Users Without Offers',
            search: 'noAffiliation:1',
          },
          {
            _id: '246813579135',

            filterType: 'boolean',
            filterLabel: 'Users With Levels',
            search: 'studentLevelUser:1',
          },
        ]}
        loading={status}
        notIncluded={[]}
      />
    </section>
  )
}

export default ClientFilter
