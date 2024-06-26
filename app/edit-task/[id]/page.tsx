"use client";
import React from 'react';
import { Moment } from 'moment';
import {  useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTodoById } from '@/app/services/queries';
import EditTaskForm from '@/app/components/EditTaskForm';

const EditTask: React.FC = () => {
  const id = useParams<{ id: string }>();
  const task = useTodoById(id.id).data;
  if(task)
  return <EditTaskForm task={task} />;
};
const queryClient = new QueryClient();

export default () => (
  <>
    <QueryClientProvider client={queryClient}>
      <main className='mx-auto mt-4 mx-40'>
        <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className='text-4xl font-bold'>Edit Task Here</h1>
          <EditTask />
        </div>
      </main>
    </QueryClientProvider>
  </>
);
