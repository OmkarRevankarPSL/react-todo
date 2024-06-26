'use client';
import Link from 'next/link';
import { Space } from 'antd';

const CustomNavbar = () => {
  return (
    <>
      <nav className="bg-gray-600 h-12 py-2 px-10 flex justify-between items-center text-white">
        <div className="px-5">
            <Link href='#'>Todo</Link>
        </div>
        <Space size={25}  className='px-10'>
          <Link href='/add-task'>Add Task</Link>
          <Link href='/view-task'>View Tasks</Link>
        </Space>
      </nav>
    </>
  );
};

export default CustomNavbar;