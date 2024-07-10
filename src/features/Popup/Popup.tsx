import Goal from './components/Goal/Goal'
import { Tour, TourProps } from 'antd'
import { lazy, useState, useRef } from 'react'
import io from 'socket.io-client'
import PopupControls from './components/PoupControls/PopupControls'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { generatePopupHTML } from './helpers/generatePopupContainer'
import { toggleEditorTour } from '@src/store/slices/sittingSlice/sittingSlice'
import { message } from 'antd'
import Content from './components/Content/Content'
import { useAppDispatch } from '@store/index'
import { generatePopupToken, updatePushedPopup, getPopupById } from '@store/slices/popup/popupThunk'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import TourButton from '@src/components/TourButton/TourButton'
import optionsImg from '@src/assets/images/tour/options.png'
import {
  calculateTimeDifference,
  calculateTimeDifferenceStartAndEnd,
  formatCurrentDateAndNextDay,
} from './helpers/calcDate'
import { setScheduleToDefault } from '@src/store/slices/popup/popupSlice'
import TargetClient from './components/TargetClient/TargetClient'
import { generateInteraction, generatePopupAsJson } from '@src/utils/generatePopupAsJson'
import { fixAlignImage } from './helpers/FixAlignImage'
import { addedDirections } from '../../utils/addedDirections'
import { filterObject } from '@src/utils/manageObject'

const Rules = lazy(() => import('./components/Rules/Rules'))
const socket_url = import.meta.env.VITE_APP_SOCKET_URL as string
const socket = io(socket_url)
const Popup = () => {
  const navigate = useNavigate()
  const { listOfContent, parameters, popupWidth, popupsTags } = useSelector(
    (state: RootState) => state.content,
  )

  const { filtersParam, guestFilters } = useSelector((state: RootState) => state.clientFilter)
  const { listOfAudience } = useSelector((state: RootState) => state.rules)
  const { popupTime, schedule, goal, titleOfPopup } = useSelector((state: RootState) => state.popup)
  const { isTourEditorOpen } = useSelector((state: RootState) => state.sitting)
  const { emoji } = useSelector((state: RootState) => state.emojis)
  const { domainData } = useSelector((state: RootState) => state.auth)
  const { id } = useParams()
  const { pathname } = useLocation()
  const updateOrCreate = pathname.split('/')[3]
  const dispatch = useAppDispatch()
  const pathToTokenPayload = window.localStorage.getItem('pathToTokenPayloadId')
  const [isDisabled, setIsDisabled] = useState(false)
  let blocks: string[] = []
  listOfContent?.map((el) => {
    const withDirections = addedDirections(el?.content)
    const withAlignFix = fixAlignImage(withDirections?.join(''))
    blocks.push(withAlignFix)
  })
  const handleClick = () => {
    if (!titleOfPopup.trim()) {
      message.error('Title of Popup is required')
    } else if (schedule?.start && !schedule?.end) {
      message.error('End Date is required')
    } else if (!schedule?.start && schedule?.end) {
      message.error('Start Date is required')
    } else {
      let diffTime: any
      let diffTime2: any
      let time: any
      if (schedule?.start) {
        diffTime = calculateTimeDifference(schedule?.start)
      }
      if (schedule?.end) {
        diffTime2 = calculateTimeDifference(schedule?.end)
        const tokenTimeDuration = calculateTimeDifferenceStartAndEnd(schedule?.start, schedule?.end)
        time = tokenTimeDuration
      }
      setIsDisabled(true)

      let components: any = []
      listOfContent?.forEach((item: any) => {
        if (item.content) {
          components.push(generatePopupAsJson(item.content))
        }
      })
      const { interaction, emojiList } = generateInteraction(emoji, parameters?.replaytype)
      dispatch(generatePopupToken(time || 24 * 60)).then((response: any) => {
        if (response?.payload?.data) {
          const POPUP_CONTENT = generatePopupHTML(
            blocks,
            parameters,
            emoji,
            popupTime,
            titleOfPopup,
            parameters?.status,
            popupWidth,
            false,
          )
          socket.emit(
            'send-popup',
            POPUP_CONTENT,
            domainData?.name || 'studentnew.takiacademy.me',
            {
              start: diffTime || { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
              end: diffTime2 || { years: 0, days: 0, hours: 24, minutes: 0, seconds: 0 },
            },
            popupTime,
            listOfAudience,
            pathToTokenPayload,
            id,
            filtersParam,
            titleOfPopup,
            response?.payload?.data,
            {
              title: titleOfPopup,
              popupToken: response?.payload?.data,
              popupId: id,
              components,
              ...(!emojiList ? {} : { emojiList }),
              interaction,
            },
            parameters['priority'] === 'normal'
              ? 0
              : parameters['priority'] === 'important'
                ? 1
                : 2,
          )
          dispatch(setScheduleToDefault())
          if (schedule?.start) {
            message.success(`Popup will be pushed at ${schedule?.start}`)
            navigate(`/posts`)
          } else {
            message.success('Popup successfully pushed')
            navigate(`/posts`)
          }
        }
      })
      updatePopup()
    }
  }
  const updatePopup = () => {
    const { current, nextDay } = formatCurrentDateAndNextDay()
    let popupDataToUpdate = {
      content: listOfContent,
      position: parameters['position'],
      status: parameters['status'],
      priority: parameters['priority'],
      replayType: parameters['replaytype'],
      emojis: parameters['replaytype'] === 'reaction' ? emoji : [],
      goal,
      schedule: [{ startDate: schedule?.start || current, endDate: schedule?.end || nextDay }],
      behavior: {
        showWhen: 0,
        time: popupTime,
      },
      title: titleOfPopup,
      target: filterObject(guestFilters),
      tag: popupsTags,
    }
    if (!goal) {
      delete popupDataToUpdate.goal
    }
    dispatch(updatePushedPopup({ popupDataToUpdate, id }))
  }
  const updateDraftPopup = () => {
    let popupDataToUpdate = {
      content: listOfContent,
      position: parameters['position'],
      status: parameters['status'],
      priority: parameters['priority'],
      replayType: parameters['replaytype'],
      emojis: parameters['replaytype'] === 'reaction' ? emoji : [],
      goal,
      schedule: [{ startDate: null, endDate: null }],
      behavior: {
        showWhen: 0,
        time: popupTime,
      },
      title: titleOfPopup,
      target: filterObject(guestFilters),
      isDraft: true,
      tag: popupsTags,
    }
    if (!goal) {
      delete popupDataToUpdate.goal
    }
    dispatch(updatePushedPopup({ popupDataToUpdate, id }))
  }
  useEffect(() => {
    if (updateOrCreate === 'update') {
      dispatch(getPopupById(id))
    }
  }, [])
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const ref5 = useRef(null)
  const ref6 = useRef(null)
  const ref7 = useRef(null)
  const ref8 = useRef(null)
  const ref9 = useRef(null)
  const ref10 = useRef(null)
  const ref11 = useRef(null)
  const ref12 = useRef(null)
  const ref13 = useRef(null)
  const ref14 = useRef(null)

  const steps: TourProps['steps'] = [
    {
      title: 'Create a Compelling Popup Title',
      description:
        'Craft a descriptive and engaging title for your popup. Make it stand out and captivate your audience.',
      target: () => ref1.current,
    },
    {
      title: 'Save Draft',
      description:
        'Preserve your work by saving the popup as a draft before finalizing. This ensures meticulous attention to detail without immediate client exposure.',
      target: () => ref2.current,
    },
    {
      title: 'Preview Across Devices',
      description:
        "Visualize your popup's appearance on both desktop and mobile devices. Ensure a seamless and responsive user experience.",
      target: () => ref3.current,
    },
    {
      title: 'Set Popup Live',
      description:
        'Initiate client engagement by sending the popup live. Deliver your content effectively and leave a lasting impression.',
      target: () => ref4.current,
    },
    {
      title: 'Choose the Format Wisely',
      description:
        'Optimize the format based on your content. Select a small format for brevity or a large format for comprehensive messaging.',
      target: () => ref5.current,
    },
    {
      title: 'Control Title Visibility',
      description:
        'Manage the visibility of your popup title to clients. Choose whether to display it or keep it hidden for a sleek design.',
      target: () => ref6.current,
    },
    {
      title: 'Prioritize Popup Importance',
      description:
        'Allocate priority levels - Normal, Important, or Urgent - to tailor the attention your popup receives. Customize it for optimal impact.',
      target: () => ref7.current,
    },
    {
      title: 'Select Replay Type',
      description:
        'Define how clients can respond to your popup - whether through comments, emojis, or no replay option.',
      target: () => ref8.current,
    },
    {
      title: 'Choose Popup Position',
      description:
        'Determine where your popup appears for clients. Control the position to enhance visibility and engagement.',
      target: () => ref9.current,
    },
    {
      title: 'Access the Popup Editor',
      description:
        'Unlock customization options in the Popup Editor. Tailor your popup to perfection with versatile editing tools.',
      target: () => ref10.current,
    },
    {
      title: 'Dashed Line Tool',
      description:
        'Use the dashed line tool strategically to add or remove elements within your popup. Enhance layout and structure effortlessly.',
      target: () => ref11.current,
    },
    {
      title: 'Explore Additional Options',
      description:
        'Unlock a world of possibilities by accessing more options - drag and drop, add text, insert custom buttons, or include custom videos.',
      cover: (
        <img
          style={{
            height: '200px',
            width: '30%',
          }}
          alt="tour.png"
          src={optionsImg}
        />
      ),
      target: () => ref12.current,
    },
    {
      title: 'Delete Block',
      description:
        'Effortlessly remove unwanted elements with the Delete Block icon. Streamline your popup content for maximum impact.',
      target: () => ref13.current,
    },
    {
      title: 'Edit Button or Video',
      description:
        'Refine and modify buttons or videos within your popup using the Edit icon. Ensure your content remains dynamic and up-to-date.',
      target: () => ref14.current,
    },
  ]
  return (
    <div className="popup-container">
      {!isDisabled && (
        <PopupControls
          updateDraftPopup={updateDraftPopup}
          socket={socket}
          refs={[ref1, ref2, ref3, ref4]}
          handleClick={handleClick}
          idOfPopup={id}
        />
      )}
      <Content
        refs={[ref5, ref6, ref7, ref8, ref9]}
        editorRefs={[ref10, ref11, ref12, ref13, ref14]}
      />
      <Rules />
      <TargetClient />
      <Goal />
      <TourButton toWhat={'editor'} />
      <Tour open={isTourEditorOpen} onClose={() => dispatch(toggleEditorTour())} steps={steps} />
    </div>
  )
}

export default Popup
