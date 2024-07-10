import { Dispatch, SetStateAction } from 'react'
import { BsPostcardHeart } from 'react-icons/bs'
import { TbMessage2, TbMoodHappy } from 'react-icons/tb'
import { VscEye } from 'react-icons/vsc'
import { useAppDispatch } from '../../../../../../store/index'
import {
  getCommentsOfPopup,
  getReactsOfPopup,
} from '../../../../../../store/slices/statistic/statisticThunk'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@src/store'
interface PostStatisticProps {
  active: boolean[]
  setActive: Dispatch<SetStateAction<boolean[]>>
  commentsLength: number
  reactsLength: number
}

const PostStatistic = ({ commentsLength, reactsLength, active, setActive }: PostStatisticProps) => {
  const postStatistic = [
    {
      name: 'Overview',
      icon: <BsPostcardHeart />,
      tag: 'Post',
    },
    {
      name: 'Views',
      number: commentsLength + reactsLength,
      icon: <VscEye />,
    },
    {
      name: 'Conversations',
      number: commentsLength,
      icon: <TbMessage2 />,
    },
    {
      name: 'Reacted',
      number: reactsLength,
      icon: <TbMoodHappy />,
    },
  ]
  const dispatch = useAppDispatch()
  const { nextPage, reactsNextPage } = useSelector((state: RootState) => state.statistic)

  const { id } = useParams()

  const handleStatClick = (pos: number) => {
    if (pos === 2 && nextPage === 1) {
      dispatch(
        getCommentsOfPopup({
          popupId: id,
          page: nextPage,
          pageSize: 5,
          orderBy: 'createdAt',
          order: 'ASC',
        }),
      )
    } else if (pos === 3 && nextPage === 1) {
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
    let updatedActive = [false, false, false, false]
    updatedActive[pos] = true
    setActive(updatedActive)
  }
  return (
    <div className="post-statistic">
      {postStatistic.map((stat: any, index: number) => {
        return (
          <div key={index}>
            <div
              onClick={() => handleStatClick(index)}
              className={`single-stat ${active[index] && 'active-stat'} `}
            >
              <div className="stat-icon">{stat?.icon}</div>
              <div>
                <p className="single-stat-number">{stat?.tag || stat?.number}</p>
                <span className="single-stat-name">{stat?.name}</span>
              </div>
            </div>
            {active[index] && <div className="active-stat-line"></div>}
          </div>
        )
      })}
    </div>
  )
}

export default PostStatistic
