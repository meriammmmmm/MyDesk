import { PiKeyboard } from 'react-icons/pi'
import {
  TbBoxAlignBottomLeft,
  TbBoxAlignBottomRight,
  TbBoxAlignTopLeft,
  TbBoxAlignTopRight,
  TbCircleLetterT,
} from 'react-icons/tb'
import { BsEmojiSmile } from 'react-icons/bs'
import { RiGitRepositoryPrivateLine } from 'react-icons/ri'
import { BiBlock } from 'react-icons/bi'
import { MdCenterFocusWeak, MdPublic } from 'react-icons/md'
import { RxKeyboard } from 'react-icons/rx'
import SingleOption from './components/SingleOption/SingleOption'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { MutableRefObject, useEffect } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { useState } from 'react'
import { Range } from '@src/components/Range/Range'
import Button from '@src/components/Button/Button'
import { useAppDispatch } from '../../../../store/index'
import { handlePopupWidth } from '@src/store/slices/contentSlice/contentSlice.slice'
import { ReactComponent as Normal } from '../../../../assets/icons/popup/normal.svg'
import { ReactComponent as Important } from '../../../../assets/icons/popup/important.svg'
import { ReactComponent as Urgent } from '../../../../assets/icons/popup/urgent.svg'
import SelectTags from '@src/components/SelectTags/SelectTags'
import FormTags from './components/FormTags/FormTags'

interface PopupSettingsProps {
  refs: MutableRefObject<null>[]
}
const PopupSettings = ({ refs }: PopupSettingsProps) => {
  const { parameters, popupWidth } = useSelector((state: RootState) => state.content)
  const [width, setWidth] = useState(String(parseInt(popupWidth)))
  const [isCustomWithOpen, setIsCustomWithOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const renderOptions = (
    options: any,
    active: string,
    propertie: string,
    icons: any,
    setIsCustomWithOpen?: (value: boolean) => void,
  ) =>
    options.map((op: string, idx: number) => (
      <SingleOption
        key={idx}
        isActive={active}
        propertie={propertie}
        icon={icons[idx]}
        value={op}
        setIsCustomWithOpen={setIsCustomWithOpen}
      />
    ))
  const handleSubmitPopupWidth = () => {
    setIsCustomWithOpen(false)
  }
  useEffect(() => {
    dispatch(handlePopupWidth(width))
  }, [width])

  return (
    <div className="popup-settings-container">
      {/* <div className="popup-settings-sender">
        <p className="popup-settings-label">From</p>
        <Select defaultValue={optionsFrom[0]} style={{ width: '100%' }} options={optionsFrom} />
      </div> */}
      <div ref={refs[0]} className="popup-settings-format">
        <p className="popup-settings-label">Format</p>
        <div className="popup-settings-options">
          {renderOptions(
            ['small', 'medium', 'large'],
            parameters['format'],
            'format',
            [<PiKeyboard />, <PiKeyboard />, <RxKeyboard />],
            setIsCustomWithOpen,
          )}
          {!isCustomWithOpen ? (
            <button
              onClick={() => setIsCustomWithOpen((prev) => !prev)}
              className="custom-popup-width"
            >
              <div>
                <IoSettingsOutline />
                <p>Custom</p>
              </div>
            </button>
          ) : (
            <div className="custom-popup-width-setting">
              <Range min={200} max={1900} label="Width:" value={width} onChange={setWidth} />
              <div>
                <Button className="button-submit-popup-width" onClick={handleSubmitPopupWidth}>
                  Submit
                </Button>
                <Button
                  className="button-cancel-popup-width"
                  onClick={() => setIsCustomWithOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div ref={refs[1]} className="popup-settings-visibility">
        <p className="popup-settings-label">Title visibility</p>
        <div className="popup-settings-options">
          {renderOptions(['public', 'private'], parameters['status'], 'status', [
            <MdPublic />,
            <RiGitRepositoryPrivateLine />,
          ])}
        </div>
      </div>
      <div ref={refs[2]} className="popup-settings-priority">
        <p className="popup-settings-label">Priority</p>
        <div className="popup-settings-options">
          {renderOptions(['normal', 'important', 'urgent'], parameters['priority'], 'priority', [
            <Normal />,
            <Important />,
            <Urgent />,
          ])}
        </div>
      </div>

      <div ref={refs[3]} className="popup-settings-reply">
        <p className="popup-settings-label">Replay Type</p>
        <div className="popup-settings-options">
          {renderOptions(['text', 'reaction', 'none'], parameters['replaytype'], 'replaytype', [
            <TbCircleLetterT />,
            <BsEmojiSmile />,
            <BiBlock />,
          ])}
        </div>
      </div>
      <div ref={refs[4]} className="popup-settings-type">
        <p className="popup-settings-label">Position</p>
        <div className="popup-settings-options">
          {renderOptions(
            ['bottomL', 'bottomR', 'topL', 'topR', 'center'],
            parameters['position'],
            'position',
            [
              <TbBoxAlignBottomLeft />,
              <TbBoxAlignBottomRight />,
              <TbBoxAlignTopLeft />,
              <TbBoxAlignTopRight />,
              <MdCenterFocusWeak />,
            ],
          )}
        </div>
      </div>
      <div className="popup-settings-tags">
        <p className="popup-settings-label">Tags</p>
        <div className="post-popups-tags">
          <SelectTags />
          <button className="post-popups-add-tags" onClick={() => setIsOpen(!isOpen)}>
            +
          </button>
          <FormTags isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  )
}

export default PopupSettings
