import { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const [showSidebar, setShowSidebar] = useState(false)
  const [collapseSidebar, setCollapseSidebar] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent | React.MouseEvent) => {
      if (!menuRef?.current?.contains(e?.target as Node)) {
        setShowSidebar(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className="main-layout">
      {showSidebar ? <span className="main-layout-shadow"></span> : null}

      <div className={`main-layout-content ${showSidebar ? 'main-layout-disable-events' : ''}`}>
        <div className="main-layout-navbar">
          <Navbar />
        </div>
        <div className="main-layout-outlet">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
