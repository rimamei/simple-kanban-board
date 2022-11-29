import { gql, useQuery, useMutation } from '@apollo/client';
import { BoardSection } from '@components';
import { DragDropContext } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTaskMutation(
    $id: String!
    $title: String
    $description: String
    $status: String!
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
    ) {
      id
      title
      description
      status
    }
  }
`;

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, loading, error } = useQuery(GET_TASKS);

  useEffect(() => {
    if (data) {
      setTasks(data.tasks)
    }
  }, [data])
  

  const sections: Array<string> = ['Backlog', 'In-Progress', 'Review', 'Done'];

  const [updateTask] = useMutation(UPDATE_TASK);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const updatedTaskList =
      tasks &&
      tasks.map((t: any) => {
        if (t.id === draggableId) {
          return {
            ...t,
            status: destination.droppableId,
          };
        } else {
          return t;
        }
      });

    setTasks(updatedTaskList);

    updateTask({
      variables: {
        id: draggableId,
        status: destination.droppableId,
      },
    });
  };

  if (loading) return <p className='text-center mt-5'>Loading...</p>;
  if (error) return <p className='text-center mt-5 text-warning'>Error</p>;

  return (
    <div className="my-5 rounded-lg h-screen overflow-hidden bg-gray-100">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-4 grid grid-cols-4 grid-flow-row gap-4">
          {sections.map((section: string, index: number) => {
            let filteredData: Array<Task> = data
              ? tasks.filter((task: Task) => {
                  return task.status === section;
                })
              : [];

            return (
              <BoardSection key={index} title={section} tasks={filteredData} />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
