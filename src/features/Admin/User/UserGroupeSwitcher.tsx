import { useState } from 'react'
import User from './User'
import Group from './Groupe'

const UserGroupSwitcher = () => {
  const [selectedView, setSelectedView] = useState('User')

  const handleSwitch = (view: any) => {
    setSelectedView(view)
  }

  return (
    <div className="switcher-container">
      <div className="tab-switcher">
        <button
          className={`switcher-button ${selectedView === 'User' ? 'active' : ''}`}
          onClick={() => handleSwitch('User')}
        >
          User
        </button>
        <button
          className={`switcher-button ${selectedView === 'Group' ? 'active' : ''}`}
          onClick={() => handleSwitch('Group')}
        >
          Group
        </button>
      </div>
      {selectedView === 'User' ? <User /> : <Group />}
    </div>
  )
}

export default UserGroupSwitcher
