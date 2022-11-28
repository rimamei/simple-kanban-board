import React from 'react';

const TaskComponent: React.FC<Task> = ({ title, description }) => {
  return (
    <div className="rounded-md border border-gray-200 p-4 bg-white">
      <h1 className="text-base text-gray-800">{title}</h1>
      <p className='text-sm text-gray-500'>{description}</p>
    </div>
  );
};

export default TaskComponent;
