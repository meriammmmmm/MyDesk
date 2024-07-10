import { useAppDispatch } from '@src/store'
import { guestFiltersChange } from '@src/store/slices/clientFilter/clientFilterSlice'
import { Switch } from 'antd'
interface ToggleFilter {
  filterLabel: string
  guestFilters: {
    group: null
    division: null
    subjects: null
    state: null
    userWithoutOffers: boolean
    usersWithLevels: boolean
  }
  WhatToggle: string
}

const ToggleFilter = ({ filterLabel, guestFilters, WhatToggle }: ToggleFilter) => {
  const dispatch = useAppDispatch()
  const onChange = (checked: boolean) => {
    if (WhatToggle.toLocaleLowerCase().includes('offers')) {
      dispatch(guestFiltersChange({ value: checked, label: 'userWithoutOffers' }))
    } else {
      dispatch(guestFiltersChange({ value: checked, label: 'usersWithLevels' }))
    }
  }
  return (
    <div className="toggle-filter-container">
      {WhatToggle.toLocaleLowerCase().includes('offers') ? (
        <Switch checked={guestFilters?.userWithoutOffers} onChange={onChange} />
      ) : (
        <Switch checked={guestFilters?.usersWithLevels} onChange={onChange} />
      )}

      <label>{filterLabel}</label>
    </div>
  )
}

export default ToggleFilter
