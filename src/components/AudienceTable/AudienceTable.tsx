import { Table } from 'antd'
import { generateColumns } from '@src/utils/createColumns'
import GuestCheckbox from '../TableData/Components/GuestCheckbox/GuestCheckbox'
import { isISO8086, setFormatTime } from '../../utils/formatTime'

interface AudienceTableProp {
  data: readonly object[] | undefined
  loading: boolean
  isUserTable?: any
  notIncluded: string[]
  posts?: any
  GuestUser?: any
}
const AudienceTable = ({
  data,
  notIncluded,
  loading,
  isUserTable,
  GuestUser,
}: AudienceTableProp) => {
  const idLabel = window.localStorage.getItem('idLabel')
  let columns = generateColumns(data, notIncluded, isUserTable, GuestUser)
  const dataSource: any[] = []
  const generateRowData = (obj: any) => {
    const rowData: any = {}
    for (let key in obj) {
      if (key === 'state' || key === 'division') {
        rowData[key] = (
          <p style={{ color: '#0c0c0cac', fontWeight: 500 }}>{obj?.[key]?.name || '-'}</p>
        )
      }
      if (key === 'email') {
        rowData[key] = <p style={{ color: '#0c0c0cac', fontWeight: 500 }}>{obj?.[key] || '-'}</p>
      }
      if (key === 'affiliations') {
        rowData[key] =
          obj[key]?.length > 0 ? (
            <p style={{ color: '#0c0c0cac', fontWeight: 500 }}>
              {obj[key]?.map((el: any, key: number) => {
                return <span key={key}>{el?.group?.name || '-'}</span>
              })}
            </p>
          ) : (
            <p>-</p>
          )
      }

      if (obj.hasOwnProperty(key)) {
        if (['string'].includes(typeof obj[key]) && isISO8086(obj[key])) {
          rowData[key] = (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '8px',
                background: '#eee',
                width: '100%',
                minWidth: '195px',
                padding: '8px 11px',
                color: '#0c0c0ca6',
                fontWeight: 500,
              }}
            >
              {setFormatTime(obj[key])}
            </p>
          )
        } else if (['string', 'number'].includes(typeof obj[key])) {
          rowData[key] = obj[key] ? (
            <p style={{ color: '#0c0c0cac', fontWeight: 500 }}>{String(obj[key])}</p>
          ) : (
            <p>-</p>
          )
        }
      }
    }
    return rowData
  }
  data?.forEach((el: any) => {
    const rowData = generateRowData(el)
    rowData['select'] = (
      <GuestCheckbox id={el[idLabel || 'id']} name={el?.name || el?.firstName || el?.first_name} />
    )
    // rowData['multipleDelete'] = (
    //   <GuestCheckbox id={el[idLabel || 'id']} name={el?.name || el?.firstName || el?.first_name} />
    // )
    dataSource.push(rowData)
  })

  return (
    <>
      <div className="table-data-container">
        <Table
          loading={loading ? true : false}
          columns={columns}
          dataSource={dataSource?.map((item, index) => ({
            ...item,
            key: index,
          }))}
          size="middle"
          pagination={false}
        ></Table>
      </div>
    </>
  )
}

export default AudienceTable
