import { Popover } from 'antd'

const PopoverCom = ({ title }: any) => {
  return title ? (
    title.length > 20 ? (
      <Popover placement="bottom" content={<p>{title}</p>} trigger="hover">
        <p style={{ color: 'rgba(28, 28, 38, 0.85)', fontWeight: '500', fontSize: '15px' }}>
          {title.substring(0, 12)}...
        </p>
      </Popover>
    ) : (
      <p style={{ color: 'rgba(28, 28, 38, 0.85)', fontWeight: '500', fontSize: '15px' }}>
        {title}
      </p>
    )
  ) : (
    <p style={{ color: 'rgba(28, 28, 38, 0.85)', fontWeight: '500', fontSize: '15px' }}>Untitled</p>
  )
}

export default PopoverCom
