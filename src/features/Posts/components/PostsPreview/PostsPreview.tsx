import PostStatistic from './components/PostStatistic/PostStatistic'
import EditorTop from '../../../Popup/components/Editor/components/EditorTop/EditorTop'
import { useState, useEffect } from 'react'
import Comments from './components/Comments/Comments'
import PopupResponse from '../../../Popup/components/Editor/components/PopupResponse/PopupResponse'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { useParams } from 'react-router-dom'
import { getPopupById } from '@store/slices/popup/popupThunk'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'
import EmojiPreview from './components/EmojiPreview/EmojiPreview'
import CSVFile from '@src/components/CSVFile'
import EmojiOverView from './components/EmojiOverView/EmojiOverView'
import { fixAlignImage } from '@src/features/Popup/helpers/FixAlignImage'

const PostsPreview = () => {
  const {
    listOfContent,
    commentsNumber,
    replayType,
    emojisList,
    titleOfViewPopup,
    reactsNumber,
    loading,
  } = useSelector((state: RootState) => state.content)
  const { comments, reacts } = useSelector((state: RootState) => state.statistic)
  const [active, setActive] = useState([true, false, false, false])
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)
  const swiperSlide: any = document.querySelector('.swiper-slide')
  const dispatch = useAppDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getPopupById(id))
  }, [])
  const handlePrevSlide = () => {
    if (swiperIndex > 0) {
      setNextDisabled(false)
      setSwiperIndex((prev) => prev - 1)
    } else {
      setPrevDisabled(true)
    }
  }
  const handleNextSlide = () => {
    if (swiperIndex < listOfContent.length - 1) {
      setPrevDisabled(false)
      setSwiperIndex((prev) => prev + 1)
    } else {
      setNextDisabled(true)
    }
  }
  return (
    <div className="post-preview-container">
      {loading && <LazyLoad />}
      <CSVFile id={id} />
      <PostStatistic
        commentsLength={commentsNumber}
        reactsLength={reactsNumber}
        active={active}
        setActive={setActive}
      />
      <div className="popup-preview-stat">
        {active[2] && commentsNumber > 0 && <Comments comments={comments} />}
        <div className="editor-container">
          <EditorTop />
          <div className="editor-blocks-background-preview">
            <div className="editor-blocks">
              <p className="previewed-popup-title">{titleOfViewPopup || ''}</p>
              <div className="swiper-container">
                <div
                  style={{
                    transform: `translateX(-${swiperIndex * swiperSlide?.offsetWidth}px)`,
                    transition: '0.5s ease-in-out',
                  }}
                  className="swiper-wrapper"
                >
                  {listOfContent.map((el: any, index: number) => {
                    return (
                      <div
                        dangerouslySetInnerHTML={{ __html: fixAlignImage(el?.content?.join('')) }}
                        key={index}
                        className="swiper-slide"
                      ></div>
                    )
                  })}
                </div>
                {listOfContent?.length > 1 ? (
                  <>
                    <button
                      style={{ opacity: `${prevDisabled || swiperIndex === 0 ? 0.5 : 1}` }}
                      onClick={handlePrevSlide}
                      className="taki-popups-prev-btn"
                    >
                      &lt;
                    </button>
                    <button
                      style={{
                        opacity: `${
                          nextDisabled || swiperIndex === listOfContent?.length - 1 ? 0.5 : 1
                        }`,
                      }}
                      onClick={handleNextSlide}
                      className="taki-popups-next-btn"
                    >
                      &gt;
                    </button>
                  </>
                ) : (
                  <p></p>
                )}
                {listOfContent.length > 1 && (
                  <div className="points-swiper-navigation">
                    {listOfContent.map((_, index) => {
                      return (
                        <span
                          onClick={() => setSwiperIndex(index)}
                          className={`swiper-navigation-point ${
                            index === swiperIndex && 'active-navigation-point'
                          }`}
                          key={index}
                        ></span>
                      )
                    })}
                  </div>
                )}
              </div>
              {active[3] && <EmojiPreview reacts={reacts} />}
              {active[2] && <PopupResponse />}
              {replayType === 'reaction' && active[0] && <EmojiOverView emojis={emojisList} />}
              {replayType === 'text' && active[0] && <PopupResponse />}
              {replayType === 'reaction' && active[1] && <EmojiOverView emojis={emojisList} />}
              {replayType === 'text' && active[1] && <PopupResponse />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostsPreview
