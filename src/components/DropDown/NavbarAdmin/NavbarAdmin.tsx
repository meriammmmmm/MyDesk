import menuIcon from '../../assets/icons/navbar/menu.svg'
import { useLocation } from 'react-router-dom'
import enFlagIcon from '../../assets/icons/navbar/en-flag.png'
import frFlagIcon from '../../assets/icons/navbar/fr-flag.png'
import arFlagIcon from '../../assets/icons/navbar/ar-flag.png'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/navbar/settings.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/navbar/logout.svg'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import CustomAvatar from '@src/components/Avatar/Avatar'
import Dropdown from '../DropDown'
import { useAppDispatch } from '@src/store'
import { logout } from '@src/store/slices/auth/authThunk'

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
  const { t, i18n } = useTranslation('translation')

  const [lang, setLang] = useState(i18n?.language?.toString())
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingOpen, setIsSettingOpen] = useState(false)

  const onChangeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLang(language)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const languagesItems = [
    {
      key: '1',
      label: (
        <div className="navbar-flag-container">
          <img src={enFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.en')}</p>
        </div>
      ),
      onClick: () => onChangeLanguage('en'),
    },
    {
      key: '2',
      label: (
        <div className="navbar-flag-container">
          <img src={frFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.fr')}</p>
        </div>
      ),
      onClick: () => onChangeLanguage('fr'),
    },
    {
      key: '3',
      label: (
        <div className="navbar-flag-container">
          <img src={arFlagIcon} alt="flag" className="navbar-flag" />
          <p>{t('language.ar')}</p>
        </div>
      ),
      onClick: () => onChangeLanguage('ar'),
    },
  ]

  const accountInfoItems = [
    {
      key: '1',
      label: (
        <div className="user-info-container">
          <CustomAvatar image={null} text="User" size={40} />

          <div className="navbar-account-info">
            <p className="sidebar-accountinfo-item">user@gmail.com</p>
            <p>Role: Admin</p>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      key: '2',
      label: <p>Profile</p>,
      icon: <ProfileIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />,
    },
    {
      key: '3',
      label: <p>Settings</p>,
      icon: <SettingsIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />,
    },
    {
      key: '4',
      label: <p onClick={handleLogout}>logout</p>,
      icon: <LogoutIcon style={{ stroke: 'black', width: '18px', height: '18px' }} />,
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
