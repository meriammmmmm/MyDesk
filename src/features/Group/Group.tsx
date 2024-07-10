import TableData from '@src/components/TableData/TableData'
import PostsSearch from '../Posts/components/PostsSearch/PostsSearch'
import Pagination from '@components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import { useAppDispatch, RootState } from '@store/index'
import { getGroups } from '@src/store/slices/group/groupThunk'
import { useSelector } from 'react-redux'
import ToggleColumn from '@src/components/ToggleColumn/ToggleColumn'
import MultipleRemoveCom from '@src/components/MultipleRemoveCom/MultipleRemoveCom'
import { getYourSettings } from '@src/store/slices/sittingSlice/sittingThunk'
import { setAttributesToStorage } from '@src/store/slices/sittingSlice/helperFunc'

const Group = () => {
  const dispatch = useAppDispatch()
  const [_toggleFilter, setToggleFilter] = useState(false)
  const [toggleColumn, setToggleColumn] = useState(false)
  useEffect(() => {
    dispatch(getGroups({ page: 1, pageSize: 5 }))
  }, [])
  const { listOfGroupsToDelete, groupsData, columnNotEncludedGroup, length } = useSelector(
    (state: RootState) => state.group,
  )
  useEffect(() => {
    dispatch(getYourSettings()).then((res: any) => {
      const {
        pageSizeParams,
        pathToId,
        pathToTokenid,
        tokenName,
        pathToTotalDocs,
        userApi,
        accessToken,
        PageParams,
      } = res?.payload?.data?.docs[0]
      setAttributesToStorage({
        endpoint: userApi,
        pathOfData: pathToId,
        token: accessToken,
        pageParams: PageParams,
        pageSizeParams,
        pathToNumberDocs: pathToTotalDocs,
        pathToTokenPayloadId: pathToTokenid,
        tokenName,
      })
    })
  }, [])
  return (
    <div className="group-container">
      <div className="group-table-and-controls">
        <PostsSearch
          setToggleFilter={setToggleFilter}
          setToggleColumn={setToggleColumn}
          forWhat={'group'}
        />
        {toggleColumn && (
          <ToggleColumn isWhat={'group'} firstObj={groupsData ? groupsData[0] : null} />
        )}
        {listOfGroupsToDelete?.length > 0 && (
          <MultipleRemoveCom isWhat={'group'} listOfItemToRemove={listOfGroupsToDelete} />
        )}
        {/* {toggleFilter && <p>hello filter</p>} */}
        <TableData
          loading={false}
          notIncluded={columnNotEncludedGroup}
          data={groupsData}
          group={true}
        />
      </div>
      <Pagination groupPaginate={true} totalItems={length} itemsPerPage={5} />
    </div>
  )
}
export default Group
