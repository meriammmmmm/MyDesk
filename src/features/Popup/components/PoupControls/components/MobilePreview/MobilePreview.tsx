import { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { RootState } from '@store/index'
import { ReactComponent as AndroidImg } from '@assets/images/preview/androidpreview.svg'
import androidHeader from '@assets/images/preview/androidheader.png'
import androidbtns from '@assets/images/preview/androidbtns.png'
import PopupResponse from '../../../Editor/components/PopupResponse/PopupResponse'
import EmojiOnlyPreview from '@components/EmojiOnlyPreview/EmojiOnlyPreview'
import DynamicPreview from '@src/components/DynamicPreview'

type MobilePreviewProps = {
  setMobilePreviewOpen: Dispatch<SetStateAction<boolean>>
  isMobilePreviewOpen: boolean
  closePopup: () => void
}
const MobilePreview: React.FC<MobilePreviewProps> = ({
  setMobilePreviewOpen,
  isMobilePreviewOpen,
  closePopup,
}) => {
  const { parameters, listOfContent } = useSelector((state: RootState) => state.content)
  const { titleOfPopup } = useSelector((state: RootState) => state.popup)
  const handleOk = () => {
    closePopup()
    setMobilePreviewOpen((prev) => !prev)
  }

  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [swiperInstance, setSwiperInstance] = useState<any>(null)
  const handleDotClick = (index: number) => {
    setActiveSlide(index)
    if (swiperInstance) {
      swiperInstance.slideTo(index)
    }
  }
  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex)
  }
  const arrayLenght = listOfContent.length - 1
  return (
    <Modal
      title={'Popup Preview:'}
      open={isMobilePreviewOpen}
      onOk={handleOk}
      onCancel={() => setMobilePreviewOpen((prev) => !prev)}
      maskClosable={false}
    >
      <section className="mobile-popup-preview">
        <div className="phone-preview-container">
          <AndroidImg />
          <img className="mobile-android-header" src={androidHeader} alt="Mobile Header" />
          <img className="mobile-btns" src={androidbtns} alt="Mobile Buttons" />
          <div className="preview-mobile-background"></div>
          <div className="popup-preview-mobile-version">
            <div className="editor-blocks-preview">
              <h1
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '18px',
                  margin: '0 !important',
                  marginTop: '10px',
                  fontWeight: 500,
                  color: 'rgba(9, 11, 23, 0.83)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '32px',
                  wordBreak: 'break-word',
                }}
              >
                {titleOfPopup}
              </h1>
              <div className="wrap-slider-mobile-preview">
                <Swiper
                  onSlideChange={handleSlideChange}
                  spaceBetween={10}
                  slidesPerView={1}
                  onSwiper={(swiper: any) => setSwiperInstance(swiper)}
                  navigation={true}
                  modules={[Navigation]}
                >
                  {listOfContent.map((el) => {
                    return (
                      <SwiperSlide key={el.id}>
                        <DynamicPreview content={el.content} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
              <div className="slider-dots">
                {listOfContent.map((_, index) => (
                  <div
                    key={_.id}
                    className={`dot ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </div>
              {arrayLenght === activeSlide &&
                (parameters?.replaytype === 'reaction' ? (
                  <EmojiOnlyPreview />
                ) : (
                  parameters?.replaytype === 'text' && <PopupResponse />
                ))}
            </div>
          </div>
        </div>
      </section>
    </Modal>
  )
}

export default MobilePreview
