import React, { useState } from 'react'
import { Table, Tag, Avatar } from 'antd'
import FormatTime from '../FormatTime/FormatTime'
import ActionControl from '../ActionControl/ActionControl'

interface TableDataProp {
  data: readonly object[] | undefined
  isUserTable?: any
  posts?: any
  GuestUser?: any
  group?: any
}

const TableData: React.FC<TableDataProp> = ({
  data,
  isUserTable,
  posts,
  GuestUser,
  group,
}: TableDataProp) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

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
          {status ? 'Active' : 'Offline'}
        </Tag>
      ),
    },
    {
      title: 'User Group',
      dataIndex: 'userGroupe',
      key: 'userGroupe ',
      render: (userGroupe: any) => <Tag>{userGroupe}</Tag>,
    },
    {
      title: 'Image Group',
      dataIndex: 'iimageGroupe',
      key: 'iimageGroupe',
      render: (iimageGroupe: any) => <Tag>{iimageGroupe}</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: any) => <FormatTime originalTime={created_at} />,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any) => <ActionControl id={record.id} />,
    },
  ]

  // Use actual data if provided, otherwise generate fake data
  const dataSource = data || generateFakeData()

  // Handle row selection change
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  // Generate fake data if none provided
  function generateFakeData() {
    const fakeData: any[] = []
    for (let i = 0; i < 50; i++) {
      fakeData.push({
        key: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        status: i % 2 === 0 ? 'Active' : 'Offline',
        userGroup: ['Admin', 'User'],
        imageGroup: { name: `Group ${i}`, color: 'blue' },
        createdAt: new Date(),
        actions: {},
        avatar: `https://i.pravatar.cc/150?img=${i}`, // Example avatar URL
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

export default TableData
