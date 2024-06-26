import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { TodoType } from '../state/todoStore';

export default function EditTaskForm ({task}:{task:TodoType})  {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{task?.title}</p>
        <p>{task?.description}</p>
        <p>{task?.isDone}</p>
      </Modal>
    </>
  );
};

