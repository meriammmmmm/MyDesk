import { useState } from 'react'
import Image from './Images'
import Group from './Groupe'
import ImageGroupe from './ImageGroupe'

const UserGroupSwitcher = () => {
  const [selectedView, setSelectedView] = useState('Image')

  const handleSwitch = (view: any) => {
    setSelectedView(view)
  }

  return (
    <div className="switcher-container">
      <div className="tab-switcher">
        <button
          className={`switcher-button ${selectedView === 'Image' ? 'active' : ''}`}
          onClick={() => handleSwitch('Image')}
        >
          Image
        </button>
        <button
          className={`switcher-button ${selectedView === 'Group' ? 'active' : ''}`}
          onClick={() => handleSwitch('Group')}
        >
          Group
        </button>
      </div>
      {selectedView === 'Image' ? <Image /> : <ImageGroupe />}
    </div>
  )
}

export default UserGroupSwitcher
