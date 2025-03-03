import { List, ListItem, Checkbox, ListItemText, IconButton } from '@mui/material';
import { Dispatch } from 'react';
import { Todo } from '../types/todo';

export const TodoList = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <List style={{ marginTop: '2rem' }}>
      {todos.map((todo) => (
        <ListItem key={todo.id} data-testid={`todo-item-${todo.id}`}>
          {/* 체크박스 */}
          <Checkbox
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
            data-testid={`todo-checkbox-${todo.id}`}
          />
          {/* 할 일 텍스트 */}
          <ListItemText
            primary={todo.text}
            secondary={`Deadline: ${todo.deadline}`}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            data-testid={`todo-text-${todo.id}`}
          />
          {/* 삭제 버튼 */}
          <IconButton
            edge="end"
            aria-label={`delete-todo-${todo.id}`}
            data-testid={`delete-button-${todo.id}`}
            onClick={() => handleDeleteTodo(todo.id)}
          >
            🗑️
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};
