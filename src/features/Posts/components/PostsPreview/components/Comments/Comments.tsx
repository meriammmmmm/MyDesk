import { TbMessage2 } from 'react-icons/tb'
import FormatTime from '@src/components/FormatTime/FormatTime'
import Button from '@src/components/Button/Button'
import { useAppDispatch } from '../../../../../../store/index'
import { getCommentsOfPopup } from '@src/store/slices/statistic/statisticThunk'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
const Comments = ({ comments }: any) => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { nextPage, hasMore } = useSelector((state: RootState) => state.statistic)

  const handleLoadMoreComments = () => {
    dispatch(
      getCommentsOfPopup({
        popupId: id,
        page: nextPage,
        pageSize: 5,
        orderBy: 'createdAt',
        order: 'ASC',
      }),
    )
  }
  return (
    <div className="popup-comments-container">
      <div className="popup-comments-title">
        <TbMessage2 />
        <span>Comments</span>
      </div>
      <div className="popup-comments">
        {comments.map((comment: any, index: number) => {
          return (
            <div key={index} className="single-comment">
              <nav className="single-comment-sender-date">
                <span className="single-comment-sender">{comment?.name}</span>
                <FormatTime isCommentDate={true} originalTime={comment?.createdAt} />
                <span className="single-comment-sender-id">{comment?.participatorId}</span>
              </nav>
              <p className="single-comment-value">{comment?.body}</p>
            </div>
          )
        })}
        {hasMore && (
          <Button onClick={handleLoadMoreComments} style={{ margin: '20px 0px' }}>
            Load more
          </Button>
        )}
      </div>
    </div>
  )
}

export default Comments
