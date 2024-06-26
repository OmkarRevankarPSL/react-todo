'use client';
import React from 'react';
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { TodoType, todoStore } from '../state/todoStore';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';
import RemoveBtn from '../components/RemoveBtn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();



export default function App() {
  const todoState = todoStore();
  const data = todoState.todos;
  const columns: TableProps<TodoType>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (_, text) => (
        <Link href={`/view-task/${text.id}`}>{text.title}</Link>
      ),
      className: 'font-bold',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 700,
      className: 'overflow-clip',
      ellipsis: true,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space size='middle'>
          <Link href={`edit-task/${record.id}`}>
            <EditOutlined key='edit' />
          </Link>
          <RemoveBtn id={record.id} />
        </Space>
      ),
    },
  ];
  return (
    <QueryClientProvider client={queryClient}>
      <Table
        className='table-fixed px-5 m-5'
        pagination={{ pageSize: 23 }}
        columns={columns}
        dataSource={data}
      />
    </QueryClientProvider>
  );
}
