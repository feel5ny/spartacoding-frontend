import { TextField, Button } from '@mui/material';
import { Dispatch } from 'react';
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

  const compareWithToday = (date: string) => {
      const today = new Date();
      const inputDate = new Date(date);

      return today < inputDate;
  };

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
        inputProps={{
            "data-testid": "todo",
        }}
        variant="outlined"
        fullWidth
        value={todo}
        onChange={(e) => updateTodo(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Deadline"
        inputProps={{
            "data-testid": "date",
        }}
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
        data-testid="button"
        onClick={handleAddTodo}
        fullWidth
        disabled={!todo.trim() || !deadline || todo.length > 100 || !compareWithToday(deadline)}
      >
        Add Todo
      </Button>
    </>
  );
};
