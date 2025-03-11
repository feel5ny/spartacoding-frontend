import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { Dispatch } from 'react';
import { deleteTodo, updateToggle } from '../controllers/todo';
import { Todo } from '../types/todo';

export const TodoList = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const handleToggleTodo = (id: number) => {
    setTodos(updateToggle(todos, id));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(deleteTodo(todos, id));
  };

  return (
    <List style={{ marginTop: '2rem' }} data-testid="todo-list">
      {todos.map((todo) => (
        <ListItem key={todo.id} data-testid="todo-item">
          <Checkbox
            slotProps={{
              input: {
                'data-testid': `todo-item-checkbox-${todo.id}`,
              },
            }}
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <ListItemText
            data-testid={`todo-item-text-${todo.id}`}
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
