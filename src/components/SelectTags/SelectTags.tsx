import React from 'react'
import { Select, Tag } from 'antd'
import type { SelectProps } from 'antd'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { getTags } from '@src/store/slices/tagsSlice/tagsThunk'
import { setTags } from '@src/store/slices/contentSlice/contentSlice.slice'

type TagRender = SelectProps['tagRender']

const SelectTags: React.FC = () => {
  const dispatch = useAppDispatch()
  const { tags } = useAppSelector((state: RootState) => state.tagsList)
  const options = tags.content.map((tag: any, index: number) => ({ value: index, label: tag.name }))

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props
    return (
      <Tag
        color={tags.content[value].color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    )
  }

  const handlChange = (data: any) => {
    const nameTags =
      data &&
      data?.map((value: number) => {
        return tags?.content[value].name
      })
    dispatch(setTags(nameTags))
  }

  return (
    <Select
      placeholder="Select Tags..."
      loading={tags.status === 'loading'}
      mode="multiple"
      tagRender={tagRender}
      style={{ width: '100%' }}
      options={options}
      onChange={handlChange}
      onClick={() => dispatch(getTags({}))}
    />
  )
}

export default SelectTags
