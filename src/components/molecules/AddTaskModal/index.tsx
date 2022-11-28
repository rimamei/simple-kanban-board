import { gql, useMutation, useQuery } from '@apollo/client';
import { Input, TextArea } from '@components';
import { Form, Formik, FormikProps } from 'formik';
import React, { useRef } from 'react';
import * as Io from 'react-icons/io';
import * as Ai from 'react-icons/ai';
import * as Yup from 'yup';
import { useOnClickOutside } from '@hooks';
import { toast } from 'react-toastify';
import { GET_TASKS, UPDATE_TASK } from '@components/organism/Board';

const CREATE_TASK = gql`
  mutation CreateTask(
    $id: String
    $title: String!
    $description: String!
    $status: String!
  ) {
    createTask(
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

const DELETE_TASK = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

interface Values {
  title: string;
  description: string;
}

interface AddTaskModalProps {
  taskData: Task;
  handleClose: () => void;
  type: string;
}

const AddTaskModal = ({ taskData, handleClose, type }: AddTaskModalProps) => {
  const { title, description, status, id } = taskData;
  const modalRef = useRef(null);

  const handleClickOutside = () => {
    handleClose();
  };

  useOnClickOutside(modalRef, handleClickOutside);

  const initialValues = { title, description };
  const SigninSchema = Yup.object().shape({
    title: Yup.string().min(1, 'Invalid Title').required('Required'),
    description: Yup.string()
      .min(1, 'Invalid description')
      .required('Required'),
  });

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const handleSubmit = async (values: Values) => {
    if (type === 'Create') {
      createTask({
        variables: {
          title: values.title,
          description: values.description,
          status,
        },
      });
      toast.success('Data has been succesfully created!');
    } else if (type === 'Update') {
      updateTask({
        variables: {
          id,
          title: values.title,
          description: values.description,
          status,
        },
      });
      toast.success('Data has been succesfully updated!');
    }
    handleClose();
  };

  const handleDelete = () => {
    deleteTask({ variables: { id } });
    toast.success('Data has been succesfully deleted!');
    handleClose();
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box" ref={modalRef}>
        <div className="flex justify-between">
          <h1 className="text-2xl pb-4">{type} Task</h1>
          {type === 'Update' ? (
            <Ai.AiFillDelete
              className="cursor-pointer text-error"
              onClick={handleDelete}
              size={24}
            />
          ) : (
            <Io.IoMdClose
              className="cursor-pointer"
              onClick={handleClose}
              size={24}
            />
          )}
        </div>
        <div className="border-b border-gray-300 "></div>
        <Formik
          initialValues={initialValues}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<Values>) => {
            const {
              values: { title, description },
            } = props;
            const disabled = title !== '' && description !== '';
            return (
              <Form>
                <Input
                  label="Title"
                  name="title"
                  placeholder="Title"
                  type="text"
                />
                <TextArea
                  label="Description"
                  name="description"
                  placeholder="Description"
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="w-full btn btn-primary"
                    type="submit"
                    disabled={!disabled}
                  >
                    {type}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddTaskModal;
