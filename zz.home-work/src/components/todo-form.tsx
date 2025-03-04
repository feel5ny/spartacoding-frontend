import { TextField, Button } from '@mui/material';
import { Dispatch } from 'react';
import { Todo } from '../types/todo';
import { useTodoForm } from '../hooks/use-todo-form';
// import { data-testid } from "@testing-library/react"

export const TodoForm = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const { initForm, updateDeadline, updateTodo, todo, deadline } =
    useTodoForm();

  const handleAddTodo = () => {
    if (!(todo.trim() && deadline)) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo.trim(),
        completed: false,
        deadline,
      },
    ]);
    initForm();
  };

  return (
    <>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        inputProps={{
            "data-testid": "todo"
        }}
        value={todo}
        onChange={(e) => updateTodo(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Deadline"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        inputProps={{
            "data-testid": "date"
        }}
        value={deadline}
        onChange={(e) => {
          const selectedDate = e.target.value;
          updateDeadline(selectedDate);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        data-testid="button"
        fullWidth
        disabled={!todo.trim() || !deadline}
      >
        Add Todo
      </Button>
    </>
  );
};
