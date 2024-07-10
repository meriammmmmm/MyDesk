import Button from '@components/Button/Button'
import Swal from 'sweetalert2'
import { useAppDispatch } from '@store/index'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'

interface handleRemoveMultipleItemsProp {
  listOfItemToRemove: string[]
  isWhat: string
}
const MultipleRemoveCom = ({ listOfItemToRemove, isWhat }: handleRemoveMultipleItemsProp) => {
  const dispatch = useAppDispatch()

  // const handleRemoveMultipleItems = () => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#506bcc',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       if (isWhat === 'posts') {
  //         dispatch(deleteMultiple(listOfItemToRemove)).then((res) => {
  //           if (res?.payload?.success) {
  //             dispatch(setListOfItemsToDefault())
  //             dispatch(checkedPosts(false))
  //             dispatch(
  //               getAllPopup({
  //                 page: 1,
  //                 pageSize: postsPerPage,
  //                 orderBy: 'createdAt',
  //                 order: 'desc',
  //               }),
  //             )
  //           }
  //         })
  //       } else if (isWhat === 'group') {
  //         dispatch(deleteMultipleGroups(listOfItemToRemove)).then((res) => {
  //           if (res?.payload?.success) {
  //             dispatch(setGroupsToDeleteDfault())
  //             dispatch(checkedPosts(false))

  //             dispatch(
  //               getGroups({
  //                 page: 1,
  //                 pageSize: groupsPerPage,
  //                 orderBy: 'createdAt',
  //                 order: 'desc',
  //               }),
  //             )
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
  return (
    <div className="multiple-remove">
      <Button variant={'danger'} label={'Delete'} />
      <span>Selected {listOfItemToRemove.length} items </span>
    </div>
  )
}

export default MultipleRemoveCom
