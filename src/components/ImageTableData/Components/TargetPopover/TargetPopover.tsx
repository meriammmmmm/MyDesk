import { Popover } from 'antd'
import { MdOutlineMenuBook } from 'react-icons/md'
const TargetPopover = ({ target }: { target: string }) => {
  return (
    <Popover
      placement="bottom"
      content={<div className="target-user-container">{target}</div>}
      trigger="hover"
    >
      <MdOutlineMenuBook className="target-user-icon" />
    </Popover>
  )
}

export default TargetPopover
