import React, { useState } from 'react'
import { Table, Tag, Avatar } from 'antd'
import FormatTime from '../FormatTime/FormatTime'
import ActionControl from '../ActionControl/ActionControl'
import ImageActionControl from '../ImageActionControl/ImageActionControl'

interface TableDataProp {
  data: readonly object[] | undefined
  isUserTable?: any
  posts?: any
  GuestUser?: any
  group?: any
}

const ImageTableData: React.FC<TableDataProp> = ({
  data,
  isUserTable,
  posts,
  GuestUser,
  group,
}: TableDataProp) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const tagColors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]

  const labelStyles: { [key: string]: { backgroundColor: string; color: string } } = {
    high: { backgroundColor: '#F2F4F7', color: '#344054' },
    good: { backgroundColor: '#EBE9FE', color: '#5925DC' },
    medium: { backgroundColor: '#FFEAD5', color: '#C4320A' },
    low: { backgroundColor: '#E5F4FD', color: '#1D98BD' },
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: any, record: any) => (
        <div className="name-column">
          <Avatar src={record.image} />
          <div className="name-info">
            <div className="name">{name}</div>
            <div className="email">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <Tag className={`status-tag ${status ? 'active' : 'offline'}`}>
          <span></span>
          {status ? 'Active' : 'Offline'}
        </Tag>
      ),
    },
    {
      title: 'Docker Image',
      dataIndex: 'dockerImage',
      key: 'dockerImage ',
      render: (dockerImage: any) => <Tag>{dockerImage}</Tag>,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (tag: any[]) => (
        <>
          {tag?.map((groupItem, index) => (
            <Tag key={index} color={tagColors[index % tagColors.length]}>
              {groupItem}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label ',
      render: (label: any) => {
        return <Tag>{label} Performance Desktop</Tag>
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any) => <ImageActionControl id={record.id} />,
    },
  ]

  const dataSource = data || generateFakeData()

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  function generateFakeData() {
    const fakeData: any[] = []
    for (let i = 0; i < 50; i++) {
      fakeData.push({
        key: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        status: i % 2 === 0 ? 'Active' : 'Offline',
        tag: ['Admin', 'User'],
        dockerImage: `docker/image:${i}`,
        label: ['high', 'medium', 'low', 'good'][i % 4],
        actions: {},
        image: `https://i.pravatar.cc/150?img=${i}`,
      })
    }
    return fakeData
  }

  return (
    <div className="table-data-container">
      <Table
        columns={columns}
        dataSource={dataSource}
        size="middle"
        pagination={{ pageSize: 10 }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        className="custom-table"
      />
    </div>
  )
}

export default ImageTableData
