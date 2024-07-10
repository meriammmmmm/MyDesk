import { handleRolesChange } from '@src/store/slices/role/roleSlice'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { Checkbox } from 'antd'

const RoleTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { roleToUpdate } = useSelector((state: RootState) => state.role)
  const { user } = useSelector((state: RootState) => state.auth)
  const [checkedItems, setCheckedItems] = useState<string[]>(roleToUpdate?.permissions || [])
  useEffect(() => {
    dispatch(handleRolesChange(checkedItems))
  }, [dispatch, checkedItems])
  let permissions: string[] = []
  user?.roles.forEach((item: any) => {
    item?.permissions?.forEach((el: string) => {
      permissions.push(el)
    })
  })
  const roles = ['domain', 'user', 'role', 'posts']
  const actions = ['get', 'create', 'update', 'delete']

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    role: string,
    action: string,
  ) => {
    const isChecked = event.target.checked
    const item = `${action}_${role}`

    if (isChecked) {
      setCheckedItems([...checkedItems, item])
    } else {
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item))
    }
  }

  const handleRowCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, role: string) => {
    const isChecked = event.target.checked
    const rowItems = actions.map((action) => `${action}_${role}`)

    if (isChecked) {
      setCheckedItems([...checkedItems, ...rowItems])
    } else {
      setCheckedItems(checkedItems.filter((checkedItem) => !rowItems.includes(checkedItem)))
    }
  }

  // const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = event.target.checked
  //   let allItems: string[] = []

  //   if (isChecked) {
  //     allItems = roles.flatMap((role: any) => actions.map((action) => `${action}_${role}`))
  //   }

  //   setCheckedItems(allItems)
  // }

  return (
    <div className="table-role-container">
      <table className="table-role">
        <thead>
          {/* <th>
            <input
            type="checkbox"
            checked={checkedItems.length === roles.length * actions.length}
            onChange={handleSelectAllChange}
            />
          </th> */}
          <tr>
            <th className="role-actions td-collection"></th>
            {actions.map((action) => (
              <th className="role-actions" key={action}>
                {action === 'get' ? 'view' : action}
              </th>
            ))}
            <th className="role-actions">All</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role: string) => (
            <tr key={role}>
              <td className="role-container">
                <p
                  style={{
                    color: '#333',
                    backgroundColor: '#eee',
                  }}
                >
                  {role === 'posts' ? 'popup' : role}
                </p>
              </td>
              {actions.map((action) => (
                <td key={action}>
                  {permissions.includes(action + '_' + role) ? (
                    <Checkbox
                      checked={checkedItems.includes(`${action}_${role}`)}
                      onChange={(event: any) => handleCheckboxChange(event, role, action)}
                      disabled={role === 'domain' && action !== 'create'}
                    />
                  ) : (
                    <Checkbox disabled={true} />
                  )}
                </td>
              ))}
              <td>
                {permissions.includes(`get_${role}`) &&
                permissions.includes(`create_${role}`) &&
                permissions.includes(`update_${role}`) &&
                permissions.includes(`delete_${role}`) ? (
                  <Checkbox
                    checked={actions.every((action) => checkedItems.includes(`${action}_${role}`))}
                    onChange={(event: any) => handleRowCheckboxChange(event, role)}
                  />
                ) : (
                  <Checkbox disabled={true} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoleTable
