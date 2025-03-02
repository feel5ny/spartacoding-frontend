import { useState } from 'react';
import { vi } from 'vitest';
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

  const isTodoTooLong = () => {
    return todo.length > 100;
  };

  const isPast = () => {
    if (!deadline) return false;
    const today = new Date();
    
    const todayStr = today.toISOString().split('T')[0];
    const todayDateOnly = new Date(todayStr);
    
    const deadlineDate = new Date(deadline);
    
    return deadlineDate < todayDateOnly;
  };

  return {
    initForm,
    updateTodo,
    updateDeadline,
    isTodoTooLong,
    isPast,
    todo,
    deadline,
  };
};
