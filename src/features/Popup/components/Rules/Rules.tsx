import { BsFileEarmarkRuled } from 'react-icons/bs'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { ReactComponent as Calender } from '@assets/icons/rules/calender.svg'
import { ReactComponent as Adience } from '@assets/icons/rules/audience.svg'
import { ReactComponent as BehaviorIcon } from '@assets/icons/rules/behavior.svg'
import RulesTitle from './components/RulesTitle/RulesTitle'
import RulesDate from './components/RulesDate/RulesDate'
import Behavior from './components/Behavior/Behavior'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { toggleRules } from '@src/store/slices/sittingSlice/sittingSlice'
import AsyncSelect from '@src/components/AsyncSelect/AsyncSelect'
import { getGroups } from '@src/store/slices/group/groupThunk'
const Rules = () => {
  const { isRulesOpen } = useSelector((state: RootState) => state.sitting)
  const { schedule } = useSelector((state: RootState) => state.popup)
  const { schedules, audience, behavior, audienceGroupName } = useSelector(
    (state: RootState) => state.rules,
  )
  const dispatch = useAppDispatch()
  const loadedFiltredData = async (q: any, _prevOptions: any, { page }: any) => {
    const response = await dispatch(getGroups({ page: page, pageSize: 5, name: q })).then(
      (response: any) => response,
    )
    return {
      options: response.payload?.data?.docs?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
        ids: item?.members,
      })),
      hasMore: response.payload?.data?.meta.hasMore,
      additional: {
        page: response?.payload?.data?.meta?.page + 1,
      },
    }
  }
  return (
    <div className="rules-container">
      <div className="rules-toggled-container" onClick={() => dispatch(toggleRules())}>
        <nav>
          <BsFileEarmarkRuled />
          <p className="rules-toggled-title">Rules</p>
          <span>{schedule?.start ? schedule?.start + ' => ' + schedule?.end : 'No rules'}</span>
          {audienceGroupName?.length > 0 && (
            <span>
              <small style={{ fontWeight: '500' }}>Audience:</small>{' '}
              {audienceGroupName?.join(' , ')}
            </span>
          )}
        </nav>
        {isRulesOpen ? (
          <MdKeyboardArrowUp className="arrow-down-toggle" />
        ) : (
          <MdKeyboardArrowDown className="arrow-down-toggle" />
        )}
      </div>

      <div className={`rules-content ${!isRulesOpen && 'toggled'}`}>
        <div className={`rules-schedule-part ${!schedules && 'filtred'}`}>
          <RulesTitle isActive={schedules} value={'schedule'} icon={<Calender />} />
          <div className="rules-date-components">
            <RulesDate />
          </div>
        </div>
        <div className={`rules-audience-part ${!audience && 'filtred'}`}>
          <RulesTitle isActive={audience} value={'Audience'} icon={<Adience />} />
          <AsyncSelect
            disabled={!audience}
            label={'Group:'}
            height={'46px'}
            className="filter-client-user-select"
            name="group"
            placeholder={'Select a group...'}
            loadPageOptions={(q: any, prevOptions: any, { page }: any) =>
              loadedFiltredData(q, prevOptions, { page })
            }
            isMulti={true}
          />
        </div>
        <div className={`rules-popup-behavior-part ${!behavior && 'filtred'}`}>
          <RulesTitle isActive={behavior} value={'popup behavior'} icon={<BehaviorIcon />} />
          <Behavior />
        </div>
      </div>
    </div>
  )
}

export default Rules
