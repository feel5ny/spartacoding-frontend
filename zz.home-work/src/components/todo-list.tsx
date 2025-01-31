import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
} from '@mui/material';
import { parseISO, format } from 'date-fns';
import { Todo } from '../types/todo';
import { Dispatch } from 'react';
import { deleteTodo, updateTodoToggle } from '../controllers/todo';

export const TodoList = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const handleToggleTodo = (id: number) => {
    setTodos(updateTodoToggle(todos, id));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(deleteTodo(todos, id));
  };

  return (
    <List style={{ marginTop: '2rem' }}>
      {todos.map((todo, idx) => (
        <ListItem key={todo.id} data-testid={`todo-item-${idx}`}>
          <Checkbox
            data-testid={`toggle-btn-${idx}`}
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <ListItemText
            data-testid={`todo-text-${idx}`}
            primary={todo.text}
            secondary={`Deadline: ${format(
              parseISO(todo.deadline),
              'yyyy-MM-dd'
            )}`}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          />
          <IconButton
            data-testid={`delete-btn-${idx}`}
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            🗑️
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};
