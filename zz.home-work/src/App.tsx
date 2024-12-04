import React, { useState } from 'react';
import { Container } from '@mui/material';
import { TodoList } from './components/todo-list';
import { Todo } from './types/todo';
import { TodoForm } from './components/todo-form';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <h1>Todo List</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  );
};

export default App;
