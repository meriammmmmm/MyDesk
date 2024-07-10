import { Select, SelectProps, Space, Tag } from 'antd'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

export default function SelectComp({ options, label, touched, error, value, setValue }: any) {
  const selectProps: SelectProps<string[]> = {
    mode: 'multiple',
    style: { width: '100%' },
    value,
    onChange: (newValue: string[]) => {
      setValue(newValue)
    },
    placeholder: 'Select Roles...',
    maxTagCount: 3,
    autoClearSearchValue: false,
  }

  console.log(options, 'jhjhjhhj')
  return (
    <div className="modal-field">
      <label className="modal-field-label">{label}</label>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select {...selectProps}>
          {options.map(
            (option: {
              value: Key | null | undefined
              index: number
              image: any
              label:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined
            }) => (
              <Select.Option key={option.value} value={option.value}>
                <Tag color={getColorForIndex(option.index)}>
                  {option?.image && (
                    <img
                      style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                      src={option?.image}
                      alt=""
                    />
                  )}
                </Tag>
                {option?.label}{' '}
              </Select.Option>
            ),
          )}
        </Select>
      </Space>
      {touched && error ? <p className="error-message">{error}</p> : null}
    </div>
  )
}

function getColorForIndex(index: number): string {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]
  return colors[index % colors.length]
}
