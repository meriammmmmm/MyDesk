import { Select, SelectProps, Space } from 'antd'
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

interface OptionType {
  value: Key | null | undefined
  index: number
  image?: string | undefined
  label:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}

interface SelectCompProps {
  options: OptionType[]
  label: string
  touched?: boolean
  error?: string | null
  value: string[]
  setValue: (value: string[]) => void
}

const SelectComp: React.FC<SelectCompProps> = ({
  options,
  label,
  touched,
  error,
  value,
  setValue,
}) => {
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

  return (
    <div className="modal-field">
      <label className="modal-field-label">{label}</label>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select {...selectProps}>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: getColorForIndex(option.index),
                  padding: '5px 10px',
                  background: 'white',
                  borderRadius: '17.45px',
                  border: `1px solid ${getColorForIndex(option.index)}`,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    marginRight: '8px',
                    backgroundColor: getColorForIndex(option.index),
                  }}
                />
                {option.image && (
                  <img
                    style={{
                      width: '30px',
                      height: '30px',

                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                    src={option.image}
                    alt=""
                  />
                )}
                {option.label}
              </div>
            </Select.Option>
          ))}
        </Select>
      </Space>
      {touched && error ? <p className="error-message">{error}</p> : null}
    </div>
  )
}

function getColorForIndex(index: number): string {
  const colors = [
    '#FFB6C1', // LightPink
    '#FF69B4', // HotPink
    '#FF1493', // DeepPink
    '#C71585', // MediumVioletRed
    '#DB7093', // PaleVioletRed
    '#FFC0CB', // Pink
    '#DC143C', // Crimson
    '#B22222', // FireBrick
    '#8B0000', // DarkRed
    '#FF4500', // OrangeRed
    '#FF6347', // Tomato
  ]
  return colors[index % colors.length]
}

export default SelectComp
