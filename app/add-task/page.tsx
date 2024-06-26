'use client';
import React, { useState } from 'react';
import { DatePicker, Form, Input, Button, FormProps } from 'antd';
import { TodoType, todoStore } from '../state/todoStore';
import { useCreateTodo } from '../services/mutations';
import { uuid } from 'uuidv4';
import { Moment } from 'moment';
import { redirect } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type FromValues = {
  title: string;
  description: string;
  duration: [Moment, Moment];
};
const AddTask: React.FC = () => {
  const [form] = Form.useForm();
  const todoState = todoStore();
  const createTodoMutation = useCreateTodo();

  const onFinish: FormProps<FromValues>['onFinish'] = async (values) => {
    const todo: TodoType = {
      id: uuid(),
      title: values.title,
      description: values.description,
      isDone: false,
      startDate: values.duration[0].format('DD-MM-YYYY'),
      endDate: values.duration[1].format('DD-MM-YYYY'),
    };
    todoState.addTodo(todo);
    const newTodo = await createTodoMutation.mutate(todo);
  };
  if (createTodoMutation.isSuccess) {
    redirect('/view-task');
  }

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        form={form}
        name='add_form'
        className='bg-gray-300 text-white rounded w-2/4 self-center'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        autoComplete='off'
        onFinish={onFinish}
        initialValues={{ isDone: false }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          className='mt-10'
          rules={[
            { required: true, message: 'Please enter the title' },
            { whitespace: true },
            { min: 5 },
          ]}
          hasFeedback
        >
          <Input placeholder='Enter Title' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: 'Please enter the decription' },
            { whitespace: true },
            { max: 200 },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name='duration' label='Duration'>
          <RangePicker
            format={'DD/MM/YYYY'}
            id={{
              start: 'startDate',
              end: 'endDate',
            }}
            className='w-full'
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            name='submit'
            className='text-center'
            type='primary'
            htmlType='submit'
            disabled={createTodoMutation.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
const queryClient = new QueryClient();

export default () => (
  <>
    <QueryClientProvider client={queryClient}>
      <main className='mx-auto mt-4 mx-40'>
        <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className='text-4xl font-bold'>Add Task Here</h1>
          <AddTask />
        </div>
      </main>
    </QueryClientProvider>
  </>
);
