'use client';
import React from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card } from 'antd';
import { useParams } from 'next/navigation';
import { useTodoById } from '@/app/services/queries';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { todoStore } from '@/app/state/todoStore';
import { useDeleteTodo } from '@/app/services/mutations';

const Todo: React.FC = () => {
  const id = useParams<{ id: string }>();
  const task = useTodoById(id.id).data;
  const todoState = todoStore();

  return (
    <div className='flex justify-center p-4 bg-gray-400 border border-gray-300 rounded-sm shadow'>
      <Card
        title='Task Details'
        bordered={false}
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <EditOutlined key='edit' onClick={() => {}} />,
          <DeleteOutlined key='delete' />,
        ]}
      >
        <div>
          <h5 className=' text-2xl font-bold tracking-tight text-gray-700 '>
            Title
          </h5>
          <p className='font-normal text-gray-700 dark:text-gray-600'>
            {task?.title}
          </p>
        </div>
        <div className='mt-5'>
          <h5 className=' text-2xl font-bold tracking-tight text-gray-700 '>
            Description
          </h5>
          <p className='font-normal text-gray-700 dark:text-gray-600'>
            {task?.description}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Todo;
