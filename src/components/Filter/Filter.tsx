import AsyncSelect from '../AsyncSelect/AsyncSelect'
import { useAppDispatch, RootState } from '@store/index'
import { fetchFiltredData } from '@src/store/slices/clientFilter/clientFilterThunk'
import Button from '@src/components/Button/Button'
import { takiFilters } from './data'
import { getUsersOfOtherWebSite } from '@src/store/slices/sittingSlice/sittingThunk'
import ToggleFilter from './Components/ToggleFilter/ToggleFilter'
import { useSelector } from 'react-redux'
import { setAudienceToDefault } from '@src/store/slices/rules/rulesSlice'
import { resetFiltersAsyncSelect } from '@src/store/slices/clientFilter/clientFilterSlice'

const Filter = ({ forWhat }: any) => {
  const dispatch = useAppDispatch()
  const { clientUsersPerpage } = useSelector((state: RootState) => state.sitting)
  const { filtersParam, guestFilters } = useSelector((state: RootState) => state.clientFilter)
  const loadedFiltredData = async (q: any, _prevOptions: any, { page }: any, endPoint: any) => {
    const response = await dispatch(fetchFiltredData({ page: page, name: q, endPoint })).then(
      (response: any) => response,
    )
    return {
      options: response.payload?.payload?.map((item: any) => ({
        value: item.id,
        label: item?.division ? item?.division?.name + ' | ' + item.name : item.name,
      })),
      hasMore: response?.payload?.meta?.current_page !== response?.payload?.meta?.last_page,
      additional: {
        page: response?.payload?.meta?.current_page + 1,
      },
    }
  }
  const handleFilterClientUsers = () => {
    dispatch(setAudienceToDefault())
    dispatch(
      getUsersOfOtherWebSite({
        page: 1,
        pageSize: clientUsersPerpage,
        filtersParam,
      }),
    )
  }
  const handleResetFilterClientUsers = () => {
    dispatch(resetFiltersAsyncSelect())
    if (!forWhat) {
      dispatch(
        getUsersOfOtherWebSite({
          page: 1,
          pageSize: clientUsersPerpage,
        }),
      )
    }
  }
  return (
    <div className="filters-container">
      <div className="filter-fields">
        {takiFilters?.map((el: any, i: number) => {
          if (el?.filterType === 'select') {
            if (!forWhat && el?.endPoint.includes('subjects')) {
              return null
            }
            if (filtersParam?.division && el?.endPoint.includes('subjects')) {
              return null
            }
            if (filtersParam?.subjects && el?.endPoint.includes('divisions')) {
              return null
            }
            return (
              <AsyncSelect
                key={i}
                label={el?.filterLabel}
                property={el?.property}
                height={'46px'}
                filtersParam={filtersParam}
                valueDefault={guestFilters[el?.property]}
                defaultValue={[]}
                endPoint={el?.endPoint}
                className="filter-client-user-select"
                name="classes"
                placeholder={`select A ${el?.filterLabel}`}
                loadPageOptions={(q: any, prevOptions: any, { page }: any) =>
                  loadedFiltredData(q, prevOptions, { page }, el?.endPoint)
                }
                isMulti={true}
              />
            )
          } else {
            if (forWhat && el?.search.includes('studentLevelUser')) {
              return null
            }
            return (
              <ToggleFilter
                key={i}
                guestFilters={guestFilters}
                filterLabel={el?.filterLabel}
                WhatToggle={el?.filterLabel}
              />
            )
          }
        })}
      </div>
      <div className="filter-btns">
        {!forWhat && (
          <Button className="target-client-filter-btn" onClick={handleFilterClientUsers}>
            FILTER
          </Button>
        )}
        <Button onClick={handleResetFilterClientUsers} variant="secondary">
          RESET
        </Button>
      </div>
    </div>
  )
}

export default Filter
