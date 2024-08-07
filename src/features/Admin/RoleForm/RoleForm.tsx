import { useParams } from 'react-router-dom'
import RoleFormControls from './components/RoleFormControls/RoleFormControls'
import RoleTable from './components/RoleTable/RoleTable'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@store/index'
import { getRoleById } from '@store/slices/role/roleThunk'
import Loader from '@src/components/Loader/Loader'

const RoleForm = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      dispatch(getRoleById(id))
        .then(() => setLoading(false))
        .catch((_error) => {
          setLoading(false)
        })
    }
  }, [id, dispatch])

  return (
    <div className="role-form-container">
      {loading && id ? (
        <Loader />
      ) : (
        <>
          <RoleFormControls />
          <RoleTable />
        </>
      )}
    </div>
  )
}

export default RoleForm
