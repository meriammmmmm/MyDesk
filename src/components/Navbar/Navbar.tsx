import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import arrowleft from '../../assets/icons/navbar/arrow-left.svg'
import arrowright from '../../assets/icons/navbar/arrow-right.svg'
import { ReactComponent as ProfileIcon } from '../../assets/icons/sidebar/profile.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/navbar/settings.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/navbar/logout.svg'
import { useAppDispatch } from '../../store'
import { useTranslation } from 'react-i18next'
import Dropdown from '../DropDown/DropDown'
import CustomAvatar from '../Avatar/Avatar'
import logo from '../../assets/icons/navbar/logo.png'
import home from '../../assets/icons/navbar/home.svg'
import { useWindowSize } from 'usehooks-ts'
import timer from '../../assets/icons/navbar/Union.svg'
import turn from '../../assets/icons/navbar/turn-off.svg'
import { logout } from '@src/store/slices/auth/authThunk'
import { fetchImages, editImages } from '@src/store/slices/images/imageThunk'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { width } = useWindowSize()
  const [transition, setTransition] = useState<boolean>(false)
  const { images } = useSelector((state: any) => state.images)
  const filteredImages = images.filter((image: { status: boolean }) => image.status === true)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes('Chrome')) {
      setTransition(true)
    } else if (userAgent.includes('Safari')) {
      setTransition(false)
    } else {
      setTransition(true)
    }
  }, [])

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation('translation')

  const [isSettingOpen, setIsSettingOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      // Optionally, redirect or perform additional actions after logout
    } catch (error: any) {
      console.error('Logout failed:', error.message)
      // Handle error if needed
    }
  }

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const toggleStatus = (image: any) => {
    const newStatus = !image.status
    if (newStatus) {
      const startTime = Date.now()
      dispatch(editImages({ newImagesData: { status: newStatus, startTime }, id: image.id }))
    } else {
      dispatch(editImages({ newImagesData: { status: newStatus, startTime: null }, id: image.id }))
    }
  }

  const calculateElapsedTime = (index: number, startTime: any) => {
    const now = Date.now()
    const diff = now - startTime
    const seconds = Math.floor((diff / 1000) % 60)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const hours = Math.floor(diff / 1000 / 60 / 60)

    // Display 'N/A' for the first image

    // Display seconds and adjust format after 60 seconds
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  const accountInfoItems = [
    {
      key: '2',
      label: (
        <a style={{ color: '#177C9A' }} href="/user">
          Switch Admin
        </a>
      ), // Navigate to /user
      icon: <ProfileIcon style={{ stroke: '#177C9A', width: '18px', height: '18px' }} />,
      onClick: () => console.log('profile'),
    },
    {
      key: '3',
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
        {/* <img src={menuIcon} alt="menu" className="navbar-left-menu-icon" /> */}
        <img src={logo} className="navbar-left-logo" alt="logo" />
        <div className="navbar-left-home">
          <img src={home} alt="home" className="navbar-left-home-image" />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {filteredImages.length > 4 ? (
            <Swiper
              className="swiper-reviews"
              slidesPerView={1}
              breakpoints={{
                700: {
                  slidesPerView: 2,
                },
                1250: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={10}
            >
              {filteredImages.map((item: any, index: any) => (
                <SwiperSlide key={index}>
                  <div className="item-image">
                    <img src={item.image} alt={item.title} className="item-image" />
                  </div>
                  <div className="item-informatin">
                    <h2 className="item-title">{item.name}</h2>
                    <div className="item-timer">
                      <img src={timer} alt="" className="timer" />
                      <p className="item-date">
                        {calculateElapsedTime(index, item.startTime)}
                      </p>{' '}
                    </div>
                  </div>
                  <img
                    style={{ width: '24px' }}
                    src={turn}
                    className="turn-off"
                    alt=""
                    onClick={() => toggleStatus(item)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            filteredImages.map((item: any, index: any) => (
              <div key={index}>
                <div className="item-image-4">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <div className="item-informatin">
                    <h2 className="item-title">{item.name}</h2>
                    <div className="item-timer">
                      <img src={timer} alt="" className="timer" />
                      <p className="item-date">
                        {calculateElapsedTime(index, item.startTime)}
                      </p>{' '}
                      {/* Pass index */}
                    </div>
                  </div>
                  <img src={turn} alt="" onClick={() => toggleStatus(item)} />
                </div>
              </div>
            ))
          )}
        </div>
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
        />
      </div>
    </div>
  )
}

export default Navbar
