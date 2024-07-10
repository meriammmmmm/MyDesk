import SidebarItems from '../SidebarItems/SidebarItems'
import smallLogoIcon from '../../assets/images/unnamed.jpeg'
import { useTranslation } from 'react-i18next'
import LogoIcon from '../../assets/images/logo.png'
interface ISidebarProps {
  collapseSidebar: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  const { i18n } = useTranslation('translation')

  return (
    <div className={`sidebar ${collapseSidebar ? 'collapse' : ''}`}>
      <div className="sidebar-content" lang={i18n?.language}>
        <div className="sidebar-logo-container">
          {collapseSidebar ? <img src={smallLogoIcon} /> : <img src={LogoIcon} />}
        </div>
        <div className="sidebar-nav-items">
          <SidebarItems collapseSidebar={collapseSidebar} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
