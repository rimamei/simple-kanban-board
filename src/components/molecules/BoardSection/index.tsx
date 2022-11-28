import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import * as Fa from 'react-icons/fa';
import { AddTaskModal, TaskComponent } from '@components';

interface BoardSectionProps {
  title: string;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [showModal, setShowModal] = useState({
    open: false,
    type: '',
    data: { id: '', title: '', description: '', status: '' },
  });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const closeModal = () => {
    setShowModal({
      open: false,
      type: '',
      data: { id: '', title: '', description: '', status: '' },
    });
  };

  const handleUpdate = (task: Task) => {
    setShowModal({
      open: true,
      type: 'Update',
      data: { ...task, status: title },
    });
  };

  const handleCreate = () => {
    setShowModal({
      open: true,
      type: 'Create',
      data: { ...showModal.data, status: title },
    });
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="mr-4">{title}</h3>
        <Fa.FaPlus />
      </div>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks &&
              tasks.map((task: Task, index) => (
                <Draggable
                  draggableId={task.id.toString()}
                  index={index}
                  key={task.id}
                >
                  {(provided) => (
                    <div
                      onClick={() => handleUpdate(task)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TaskComponent
                        title={task.title}
                        description={task.description}
                        id={task.id}
                      />
                      <div className="mb-4" />
                    </div>
                  )}
                </Draggable>
              ))}
            <div
              className={
                tasks?.length === 0 ? 'h-screen bg-gray-200 rounded-md p-4' : ''
              }
            >
              <button
                className="mx-auto flex justify-center items-center w-full p-2 bg-transparent hover:bg-gray-100 rounded-md"
                onClick={handleCreate}
              >
                <p className="mr-2">Add Task</p>
                <Fa.FaPlus />
              </button>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showModal.open && (
        <AddTaskModal
          handleClose={closeModal}
          type={showModal.type}
          taskData={showModal.data}
        />
      )}
    </div>
  );
};

export default BoardSection;
