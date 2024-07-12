import menuIcon from '../../assets/icons/navbar/menu.svg'
import { useLocation } from 'react-router-dom'
import ThemeButton from '../ThemeButton/ThemeButton'
import enFlagIcon from '../../assets/icons/navbar/en-flag.png'
import frFlagIcon from '../../assets/icons/navbar/fr-flag.png'
import arFlagIcon from '../../assets/icons/navbar/ar-flag.png'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/navbar/settings.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/navbar/logout.svg'
import { useAppDispatch, useAppSelector } from '../../store'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Dropdown from '../DropDown/DropDown'
import CustomAvatar from '../Avatar/Avatar'
import { logout } from '@src/store/slices/auth/authThunk'
import { fetchUsers } from '@src/store/slices/users/userThunk'
import { useSelector } from 'react-redux'

interface INavbarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setCollapseSidebar: React.Dispatch<React.SetStateAction<boolean>>
  collapseSidebar: boolean
}

const NavbarAdmin: React.FC<INavbarProps> = ({
  setShowSidebar,
  setCollapseSidebar,
  collapseSidebar,
}) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation('translation')

  const [isSettingOpen, setIsSettingOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
  }
  const user = useSelector((state: any) => state.auth.user)
  console.log(user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  const accountInfoItems = [
    {
      key: '1',
      label: (
        <div className="user-info-container">
          <CustomAvatar image={null} text="User" size={40} />

          <div className="navbar-account-info">
            <p style={{ color: '#177C9A' }} className="sidebar-accountinfo-item">
              {user.user.email}
            </p>
            <p style={{ color: '#177C9A' }}>{user.user.name}</p>
          </div>
        </div>
      ),
      disabled: true,
    },

    {
      key: '4',
      label: (
        <p style={{ color: '#177C9A' }} onClick={handleLogout}>
          logout
        </p>
      ),
      icon: <LogoutIcon style={{ stroke: '#177C9A', width: '18px', height: '18px' }} />,
    },
  ]
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon"
          onClick={() => {
            setCollapseSidebar(false)
            setShowSidebar(true)
          }}
        />
        <img
          src={menuIcon}
          alt="menu"
          className="navbar-left-menu-icon-collapse"
          onClick={() => setCollapseSidebar(!collapseSidebar)}
        />
        <p className="navbar-left-title">{pathname.split('/')[1]}</p>
      </div>
      <div className="navbar-right">
        <Dropdown
          isOpen={isSettingOpen}
          placement={i18n?.language === 'ar' ? 'bottomLeft' : 'bottomRight'}
          setIsOpen={setIsSettingOpen}
          items={accountInfoItems}
          triggerElement={
            <button onClick={() => setIsSettingOpen(true)} className="navbar-avatar-btn">
              <CustomAvatar image={null} text="User" size={40} />
            </button>
          }
        ></Dropdown>
      </div>
    </div>
  )
}

export default NavbarAdmin
