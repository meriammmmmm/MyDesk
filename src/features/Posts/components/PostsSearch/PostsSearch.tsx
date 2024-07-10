import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tour, TourProps, Select, Tag } from 'antd'
import { IoMdAdd } from 'react-icons/io'
import type { SelectProps } from 'antd'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { getAllPopup } from '@store/slices/popup/popupThunk'
import { createNewPopup } from '@store/slices/popup/popupThunk'
import {
  resetToDefault,
  setContentsToDefault,
} from '@src/store/slices/contentSlice/contentSlice.slice'
import { Can } from '@src/casl/Can'
import photoEditor from '@src/assets/images/tour/editor.png'
import popupImg from '@src/assets/images/tour/popup.png'
import {
  setRulesGoalTargetClientToDefault,
  togglePostsTour,
} from '@src/store/slices/sittingSlice/sittingSlice'
import { setScheduleToDefault, setTitleToDefault } from '@src/store/slices/popup/popupSlice'
import { FiToggleLeft } from 'react-icons/fi'
import {
  setAudienceToDefault,
  setScheduleAudienceBehaviorToDefault,
} from '@src/store/slices/rules/rulesSlice'
import { setGroupUpdateToDefault } from '@src/store/slices/group/groupSlice'
import { getGroups } from '@src/store/slices/group/groupThunk'
import { IoFilter } from 'react-icons/io5'
import { resetFiltersAsyncSelect } from '@src/store/slices/clientFilter/clientFilterSlice'
import { getTags } from '@src/store/slices/tagsSlice/tagsThunk'

type TagRender = SelectProps['tagRender']

const PostsSearch = ({ forWhat, setToggleColumn }: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState({
    position: undefined,
    status: undefined,
    priority: undefined,
    tag: [],
  })
  const { isTourPostsOpen, postsPerPage, groupsPerPage } = useSelector(
    (state: RootState) => state.sitting,
  )
  const { listOfContent, parameters } = useSelector((state: RootState) => state.content)
  const { tags } = useAppSelector((state: RootState) => state.tagsList)
  useEffect(() => {
    const delay = 500
    const id = setTimeout(() => {
      if (forWhat === 'post') {
        dispatch(
          getAllPopup({
            ...(searchValue.length > 0 ? { searchWith: 'title' } : {}),
            ...(searchValue.length > 0 ? { searchValue } : {}),
            pageSize: postsPerPage,
            orderBy: 'createdAt',
            order: 'desc',
            position: filterCriteria.position,
            status: filterCriteria.status,
            priority: filterCriteria.priority,
            tag: filterCriteria.tag,
          }),
        )
      } else {
        dispatch(
          getGroups({
            pageSize: groupsPerPage,
            name: searchValue,
            orderBy: 'createdAt',
            order: 'desc',
          }),
        )
      }
    }, delay)
    return () => {
      clearTimeout(id)
    }
  }, [searchValue, dispatch, postsPerPage, groupsPerPage, filterCriteria])

  const handleCreatePopup = () => {
    dispatch(setAudienceToDefault())
    dispatch(setTitleToDefault())
    dispatch(resetFiltersAsyncSelect())
    dispatch(setScheduleToDefault())
    dispatch(resetToDefault())
    dispatch(setScheduleAudienceBehaviorToDefault())
    dispatch(setRulesGoalTargetClientToDefault())
    dispatch(setContentsToDefault())
    let popupData = {
      content: listOfContent,
      position: parameters['position'],
      status: parameters['status'],
    }
    dispatch(createNewPopup(popupData)).then((res) => {
      const popupId = res?.payload?.data?._id
      if (popupId) {
        navigate(`/posts/${popupId}/create`)
      }
    })
  }
  const toggleColumn = () => {
    setToggleColumn((prev: boolean) => !prev)
  }
  const handleCreateGroup = () => {
    dispatch(setGroupUpdateToDefault())
    dispatch(setAudienceToDefault())
    navigate('/group/create')
  }
  const ref1 = useRef(null)
  const steps: TourProps['steps'] = [
    {
      title: 'New Popup Button',
      description:
        'When you click on New Popup you can create your custom Popup and send it to your client.',

      target: () => ref1.current,
    },
    {
      title: 'Enjoy an amazing experience with beautiful in-editor designs! ✨🖌️',

      cover: (
        <img
          style={{
            height: '300px',
            width: '300px',
          }}
          alt="tour.png"
          src={photoEditor}
        />
      ),
      target: () => ref1.current,
    },
    {
      title:
        'After customizing the popup, click the "Set Live" button to send it to your client. 🎨📤',

      cover: (
        <img
          style={{
            height: '250px',
            width: '500px',
          }}
          alt="tour.png"
          src={popupImg}
        />
      ),
      target: () => ref1.current,
    },
    {
      title: (
        <div
          style={{
            marginTop: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <p style={{ fontSize: '28px' }}>Thank you for using Popup!</p>
          <p style={{ fontSize: '42px' }}>🎉🎉🎉</p>
        </div>
      ),

      target: () => ref1.current,
    },
  ]

  const handleFilterChange = (filterType: any, value: any) => {
    const nameTags =
      filterType === 'tag' &&
      value &&
      value?.map((value: number) => {
        return tags?.content[value].name
      })
    if (filterType == 'tag') value = '[' + nameTags.join(',') + ']'
    setFilterCriteria((prevFilterCriteria) => ({
      ...prevFilterCriteria,
      [filterType]: value,
    }))
  }
  const handleOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props
    return (
      <Tag
        color={tags.content[value].color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    )
  }

  const handleResetFilters = () => {
    setFilterCriteria({
      position: undefined,
      status: undefined,
      priority: undefined,
      tag: [],
    })
    // dispatch()
  }

  return (
    <div className="post-search-container">
      <Can I="create" a="posts">
        <button
          onClick={forWhat === 'post' ? handleCreatePopup : handleCreateGroup}
          ref={ref1}
          className="new-message-button"
        >
          <IoMdAdd />
          <span>{forWhat === 'post' ? 'New Popup' : 'Create Group'}</span>
        </button>
        <Tour open={isTourPostsOpen} onClose={() => dispatch(togglePostsTour())} steps={steps} />
      </Can>
      <div className="search-part">
        {forWhat === 'post' && (
          <button className="search-part-filter-button" onClick={() => handleOpenFilter()}>
            <IoFilter />
            <span>Filter</span>
          </button>
        )}

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search ..."
          type="text"
          className="search-part-input"
        />
        <button onClick={toggleColumn} className="hide-show-columns-btn">
          <FiToggleLeft />
          <span>Columns</span>
        </button>
      </div>

      {openFilter && (
        <div className="search-by-filter">
          <Select
            placeholder={!filterCriteria.position && 'Position'}
            value={filterCriteria.position}
            onChange={(value) => handleFilterChange('position', value)}
            options={[
              { value: 'bottomL', label: 'bottomL' },
              { value: 'bottomR', label: 'bottomR' },
              { value: 'topL', label: 'topL' },
              { value: 'topR', label: 'topR' },
              { value: 'center', label: 'center' },
            ]}
          />
          <Select
            placeholder={!filterCriteria.status && 'Status'}
            value={filterCriteria.status}
            onChange={(value) => handleFilterChange('status', value)}
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'running', label: 'Running' },
              { value: 'canceled', label: 'Canceled' },
              { value: 'finished', label: 'Finished' },
              { value: 'pending', label: 'Pending' },
            ]}
          />
          <Select
            placeholder={!filterCriteria.priority && 'Priority'}
            value={filterCriteria.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            options={[
              { value: 'normal', label: 'Normal' },
              { value: 'important', label: 'Important' },
              { value: 'urgent', label: 'Urgent' },
            ]}
          />
          <Select
            mode="multiple"
            placeholder="Select Tags..."
            loading={tags.status === 'loading'}
            tagRender={tagRender}
            onClick={() => dispatch(getTags({}))}
            options={tags.content.map((tag: any, index: number) => ({
              value: index,
              label: tag.name,
            }))}
            onChange={(value) => handleFilterChange('tag', value)}
            // value={filterCriteria.tag.map((tag) => tag)}
          />
          <button onClick={() => handleResetFilters()} className="btn-reset-filter">
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

export default PostsSearch
