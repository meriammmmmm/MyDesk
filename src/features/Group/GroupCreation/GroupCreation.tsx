import Loader from '@src/components/Loader/Loader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '@store/index'
import GroupCreationHeader from '../components/GroupCreateionHeader/GroupCreationHeader'
import GroupTable from '../components/GroupTable/GroupTable'
import { getGroupById } from '@store/slices/group/groupThunk'
import { addedAudience } from '@src/store/slices/rules/rulesSlice'
const GroupCreation = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      dispatch(getGroupById(id))
        .then((res) => {
          const data = res?.payload?.data?.members
          data?.map(({ name, memberId }: any) => {
            dispatch(addedAudience({ id: memberId, name }))
          })
          setLoading(false)
        })
        .catch((_error) => {
          setLoading(false)
        })
    }
  }, [id, dispatch])
  return (
    <div className="group-creation-container">
      {loading && id ? (
        <Loader />
      ) : (
        <>
          <GroupCreationHeader />
          <GroupTable />
        </>
      )}
    </div>
  )
}

export default GroupCreation
