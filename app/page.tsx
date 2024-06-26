'use client';

import { todoStore } from './state/todoStore';
import SearchTodo from './components/SearchTodo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ViewTask from './components/ViewTask';
import FormTodo from './components/FormTodo';

const queryClient = new QueryClient();

export default function Home() {
  const tasks = todoStore().todos;
  return (
    <QueryClientProvider client={queryClient}>
      <main className='mx-auto mt-4 mx-40'>
        <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className='text-4xl font-bold'>Todo List App</h1>
          {/* <SearchTodo /> */}
          <ViewTask />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </main>
    </QueryClientProvider>
  );
}
