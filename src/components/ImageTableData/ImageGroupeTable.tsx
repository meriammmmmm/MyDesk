import React, { useState } from 'react'
import { Table, Tag, Avatar } from 'antd'
import FormatTime from '@src/components/FormatTime/FormatTime'
import ActionControl from '@src/components/ActionControl/ActionControl'
import UserGroupeActionControl from '@src/components/userGroupeActionControl/ActionControl'
import ImageGroupeActionControl from '../imageGroupeActionControl/ActionControl'

interface TableDataProp {
  data: readonly object[] | undefined
  isUserTable?: any
  posts?: any
  GuestUser?: any
  group?: any
}

const GroupeTable: React.FC<TableDataProp> = ({ data }: TableDataProp) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: any, record: any) => (
        <div className="name-column">
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
          <span></span> {status ? 'Active' : 'Offline'}
        </Tag>
      ),
    },
    {
      title: 'Image Group',
      dataIndex: 'imageGroupe',
      key: 'imageGroupe',
      render: (imageGroupe: any[]) => (
        <>
          {imageGroupe.map((groupItem, index) => (
            <Tag key={index}>{groupItem}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'User number',
      dataIndex: 'users',
      key: 'users ',
      render: (users: any) => <p> +{users?.length} users</p>,
    },
    {
      title: 'UserGroupe number',
      dataIndex: 'users',
      key: 'users ',
      render: (users: any) => <p> +{users?.length} users</p>,
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
      render: (text: any, record: any) => <ImageGroupeActionControl id={record.id} />,
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

export default GroupeTable
