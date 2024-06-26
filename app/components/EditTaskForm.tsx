import React, { useState } from 'react';
import { Button, DatePicker, Form, FormProps, Input, Modal } from 'antd';
import { TodoType, todoStore } from '../state/todoStore';
import { redirect } from 'next/navigation';
import { uuid } from 'uuidv4';
import { Moment } from 'moment';
import { useUpdateTodo } from '../services/mutations';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
type FromValues = {
  title: string;
  description: string;
  isDone: boolean
  duration: [Moment, Moment];
};
export default function EditTaskForm ({task}:{task:TodoType})  {
 
  const todoState=todoStore();
  const updateMutation = useUpdateTodo();
  const onFinish: FormProps<FromValues>['onFinish'] = async (values) => {
    const todo: TodoType = {
      id: uuid(),
      title: values.title,
      description: values.description,
      isDone: values.isDone,
      startDate: values.duration[0].format('DD-MM-YYYY'),
      endDate: values.duration[1].format('DD-MM-YYYY'),
    };
    todoState.editTodo(task.id, todo);
    updateMutation.mutate(todo);
  };
  if (updateMutation.isSuccess) {
    redirect('/view-task');
  }

  const onFinishFailed=()=>{
return <h5>Error Occured!</h5>  }

  return (
    <>
      <Form
        className='bg-gray-300 text-white rounded w-2/4 self-center'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        autoComplete='off'
        onFinish={onFinish}
        initialValues={{ isDone: task.isDone }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          className='mt-10'
          initialValue={task.title}
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
          initialValue= {task.description}
          rules={[
            { required: true, message: 'Please enter the decription' },
            { whitespace: true },
            { max: 200 },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name='duration'  label='Duration'>
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
            disabled={updateMutation.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

