import { useState } from 'react';

export const useTodoForm = () => {
  const [todo, setTodo] = useState('');
  const [deadline, setDeadline] = useState('');

  const initForm = () => {
    setTodo('');
    setDeadline('');
  };

  const updateTodo = (newTodo: string) => {
    setTodo(newTodo);
  };

  const updateDeadline = (date: string) => {
    setDeadline(date);
  };

  return {
    initForm,
    updateTodo,
    updateDeadline,
    //
    todo,
    deadline,
  };
};
