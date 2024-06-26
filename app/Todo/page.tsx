"use client";
import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { TodoType } from '../state/todoStore';

const { Meta } = Card;

const Todo: React.FC<TodoType> = (task: TodoType) => (
  <div className='flex justify-center h-96'>
  <Card
    style={{ width: 300, alignSelf: 'center' }}
    actions={[
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete" />,
    ]}
  >
    <Meta
      title={task.title}
      description={task.description}
    />
  </Card></div>
);

export default Todo;