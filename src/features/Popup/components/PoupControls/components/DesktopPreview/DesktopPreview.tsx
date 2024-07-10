import { useState, useEffect } from 'react'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
const DesktopPreview = ({ postPreview }: { postPreview: String; closePopup: () => void }) => {
  const { popupWidth } = useSelector((state: RootState) => state.content)
  const [width, _setWidth] = useState(String(parseInt(popupWidth)))
  const popupElement: HTMLDivElement | null = document.querySelector('.animated-div')
  if (popupElement) {
    const newMaxWidthValue = width + 'px'
    popupElement.style.maxWidth = newMaxWidthValue
  }
  const isSwiperThere = document.querySelector('.swiper-container') ? true : false
  useEffect(() => {
    const swiperWrapper: HTMLElement | null = document.querySelector('.swiper-wrapper')
    const prevButton: any = document.querySelector('.taki-popups-prev-btn')
    const nextButton: any = document.querySelector('.taki-popups-next-btn')
    const popupReply: any = document.querySelector('.taki-popups-reply')
    const swiperLength = document.querySelectorAll('.swiper-slide').length
    const navigationPoints: any = document.querySelectorAll('.taki-popups-navigation-point')
    let currentIndex: number = 0
    if (navigationPoints[currentIndex]) {
      navigationPoints[currentIndex].style.background = '#331'
    }
    function resetPoint(i: number) {
      navigationPoints?.forEach((el: any) => (el.style.background = ''))
      navigationPoints[i].style.background = '#331'
    }
    navigationPoints?.forEach((el: any, i: number) =>
      el.addEventListener('click', () => {
        currentIndex = i
        resetPoint(currentIndex)
        el.style.background = '#331'
        showSlide(i)
        if (i === swiperLength - 1) {
          nextButton.style.opacity = '0.5'
        } else if (i === 0) {
          prevButton.style.opacity = '0.5'
        } else {
          prevButton.style.opacity = '1'
          nextButton.style.opacity = '1'
        }
      }),
    )
    if (prevButton) prevButton.style.opacity = '0.5'
    if (swiperLength > 1 && popupReply) {
      popupReply.style.opacity = '0'
    }
    function showSlide(index: number): void {
      resetPoint(index)
      if (swiperLength - 1 === index && popupReply) {
        popupReply.style.opacity = '1'
        popupReply.style.transition = '0.3s'
      }
      if (swiperLength - 1 !== index && popupReply) {
        popupReply.style.opacity = '0'
        popupReply.style.transition = '0.3s'
      }
      const slideElement: HTMLElement | null = document.querySelector('.swiper-slide')
      if (slideElement !== null && swiperWrapper !== null) {
        const slideWidth: number = slideElement.offsetWidth
        swiperWrapper.style.transform = `translateX(-${index * slideWidth}px)`
        swiperWrapper.style.transition = '0.5s ease-in-out'
      }
    }
    function prevSlide() {
      if (currentIndex !== 0) {
        nextButton.style.opacity = '1'
        currentIndex = (currentIndex - 1 + swiperLength) % swiperLength
        showSlide(currentIndex)
      }
      if (currentIndex === 0) {
        prevButton.style.opacity = '0.5'
      }
    }
    function nextSlide() {
      if (currentIndex !== swiperLength - 1) {
        prevButton.style.opacity = '1'
        currentIndex = (currentIndex + 1) % swiperLength
        showSlide(currentIndex)
      }
      if (currentIndex === swiperLength - 1) {
        nextButton.style.opacity = '0.5'
      }
    }
    prevButton?.addEventListener('click', prevSlide)
    nextButton?.addEventListener('click', nextSlide)
    return () => {
      prevButton?.removeEventListener('click', prevSlide)
      nextButton?.removeEventListener('click', nextSlide)
    }
  }, [isSwiperThere])

  return (
    <div className="popup-preview-desktop">
      <div dangerouslySetInnerHTML={{ __html: postPreview }}></div>
    </div>
  )
}

export default DesktopPreview
