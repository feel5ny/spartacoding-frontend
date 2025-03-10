import { TextField, Button } from '@mui/material';
import { Dispatch, useState } from 'react';
import { Todo } from '../types/todo';
import { useTodoForm } from '../hooks/use-todo-form';

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

  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        value={todo}
        inputProps={{ "data-testid": "todo-form-text" }}
        onChange={(e) => {
          updateTodo(e.target.value)
          if (e.target.value.length >= 100) setDisabled(false);
          else setDisabled(true);
        }}
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
          updateDeadline(selectedDate);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        data-testid="todo-submit-btn"
        fullWidth
        disabled={disabled && (!todo.trim() || !deadline)}
      >
        Add Todo
      </Button>
    </>
  );
};
