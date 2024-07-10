// import { setFormatTime } from '@src/utils/formatTime'
import { Popover } from 'antd'
import { IoCloseSharp } from 'react-icons/io5'
import { useAppDispatch } from '../../../../../../store/index'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'
import { getReactsOfPopup } from '../../../../../../store/slices/statistic/statisticThunk'
import { useParams } from 'react-router-dom'
const EmojiPreview = ({ reacts }: any) => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { reactsNextPage, reactsHasMore } = useSelector((state: RootState) => state.statistic)

  const loadMoreReacts = () => {
    dispatch(
      getReactsOfPopup({
        popupId: id,
        page: reactsNextPage,
        pageSize: 5,
        orderBy: 'createdAt',
        order: 'ASC',
      }),
    )
  }
  const emojiCounts: { [key: string]: number } = {}
  reacts.forEach((react: any) => {
    const emoji = react?.code
    emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1
  })
  const uniqueEmojis: string[] = Array.from(new Set(reacts.map((react: any) => react?.code)))

  return (
    <div className="emoji-preview-container">
      <div className="emoji-preview">
        {uniqueEmojis.length > 0 ? (
          uniqueEmojis.map((emoji: string, index: number) => (
            <Popover
              key={index}
              className="popover-reaction-count"
              placement="bottom"
              content={
                <section className="reacted-people-list">
                  {reacts.map((el: any, key: number) => {
                    if (el?.code === emoji)
                      return (
                        <div key={key} className="reacted-list-item">
                          <p className="reacted-item-id">
                            <span>
                              {el?.participatorId} : {el?.name}
                            </span>
                          </p>
                        </div>
                      )
                  })}
                  {reactsHasMore && <a onClick={loadMoreReacts}>Load more</a>}
                </section>
              }
              trigger="hover"
            >
              <div className="emoji-icon" key={index}>
                <span>{emoji.toLowerCase() === 'x-close' ? <IoCloseSharp /> : emoji}</span>
                <p className="react-number">{emojiCounts[emoji]}</p>
              </div>
            </Popover>
          ))
        ) : (
          <p>No reaction </p>
        )}
      </div>
    </div>
  )
}
export default EmojiPreview
