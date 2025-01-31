import { Todo } from '../types/todo';

export const updateTodoToggle = (todos: Todo[], id: number) => {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

export const deleteTodo = (todos: Todo[], id: number) => {
  return todos.filter((todo) => todo.id !== id);
};
