import { parseISO } from 'date-fns';
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

  const validateCredential = ({
    todo,
    deadline,
  }: {
    todo: string;
    deadline: string;
  }) => {
    if (!(todo.trim() && deadline)) return false;
    if (todo.length > 100) return false;
    if (parseISO(deadline) < new Date()) return false;

    return true;
  };

  return {
    initForm,
    updateTodo,
    updateDeadline,
    validateCredential,
    //
    todo,
    deadline,
  };
};
