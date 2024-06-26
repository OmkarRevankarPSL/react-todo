'use client';

import { todoStore } from '../../state/todoStore';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Link from 'next/link';
import Todo from './view_page';

const queryClient = new QueryClient();

export default function Home() {
  const tasks = todoStore().todos;
  return (
    <QueryClientProvider client={queryClient}>
     
          <Todo/>
       
    </QueryClientProvider>
  );
}
