import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
} from '@mui/material';
import { parseISO, format } from 'date-fns';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  deadline: string;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTodo = () => {
    if (input.trim() && deadline) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        deadline,
      };
      setTodos([...todos, newTodo]);
      setInput('');
      setDeadline('');
    }
  };

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
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <h1>Todo List</h1>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Deadline"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={deadline}
        onChange={(e) => {
          const selectedDate = e.target.value;
          setDeadline(selectedDate);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        fullWidth
        disabled={!input.trim() || !deadline}
      >
        Add Todo
      </Button>
      <List style={{ marginTop: '2rem' }}>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <ListItemText
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
    </Container>
  );
};

export default App;
