'use client';
import React, { useState } from 'react';
import { Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { TodoType, todoStore } from '../state/todoStore';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';
import RemoveBtn from '../components/RemoveBtn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './page.module.css'
import CompleteBtn from '../components/CompleteBtn';
import SearchTodo from '../components/SearchTodo';
const queryClient = new QueryClient();


type OnChange = NonNullable<TableProps<TodoType>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export default function App() {
  const todoState = todoStore();
  const data = todoState.todos;
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter as Sorts);
  };
  const columns: TableColumnsType<TodoType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'name',
      sorter: (a, b) =>{ if(a.title < b.title) return -1; if(a.title > b.title) return 1; return 0},
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, text) => (
        <Link href={`/view-task/${text.id}`}>{text.title}</Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'overflow-clip',
      ellipsis: true,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ["sm"],
      render: (_, record) => (
        <Space size='middle'>
          <Link href={`edit-task/${record.id}`}>
            <EditOutlined key='edit' />
          </Link>
          <RemoveBtn id={record.id}/>
          <CompleteBtn data={record}/>
        </Space>
      ),
    },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <div className='mt-5 '>
      <SearchTodo/>
      <Table
        className=' px-5 m-5'
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowClassName={(record) => record.isDone? styles.strikethrough: ''}
      />
      </div>
    </QueryClientProvider>

  );
}
