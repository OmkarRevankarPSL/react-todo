import React, { useState } from 'react';
import { DatePicker, Form, Input, Button, FormProps } from 'antd';
import { TodoType, todoStore } from '../state/todoStore';
import { useCreateTodo } from '../services/mutations';
import { uuid } from 'uuidv4';
import  { Moment } from 'moment';
import { redirect } from 'next/navigation'

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type FromValues = {
  title: string;
  description: string;
  duration : [Moment, Moment]
}
const FormTodo: React.FC<TodoType> = (existingTodo) => {

  console.log("Existing Todo: ", existingTodo)
  const todoState = todoStore();
  const createTodoMutation = useCreateTodo();

  const onFinish: FormProps<FromValues>['onFinish'] = async (values) => {
    const todo: TodoType = {
      id:  uuid(),
      title: values.title,
      description: values.description,
      isDone: false,
      startDate: values.duration[0].format('DD-MM-YYYY'),
      endDate: values.duration[1].format('DD-MM-YYYY'),
    };
    todoState.addTodo(todo);
    const newTodo = await createTodoMutation.mutate(todo);
  };
  if(createTodoMutation.isSuccess){
    redirect('/Todo')

    }

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
        initialValues={{ isDone: true }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          className='mt-10'
          initialValue={existingTodo.title}
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
          initialValue= {existingTodo.description}
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
            disabled={createTodoMutation.isPending}
            
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormTodo;
