import { TextField, Button } from '@mui/material';
import { Dispatch } from 'react';
import { Todo } from '../types/todo';
import { useTodoForm } from '../hooks/use-todo-form';
import { isAfter } from 'date-fns';

export const TodoForm = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const { initForm, updateDeadline, updateTodo, todo, deadline } =
    useTodoForm();
  const MAX_TODO_LENGTH = 100;

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
        inputProps={{
          'data-testid': 'todo-form-text',
        }}
        label="New Todo"
        variant="outlined"
        fullWidth
        value={todo}
        onChange={(e) => updateTodo(e.target.value)}
        style={{ marginBottom: '1rem' }}
        error={todo.length > MAX_TODO_LENGTH}
        helperText={todo.length > MAX_TODO_LENGTH ? '할 일은 100자 이하로 입력해주세요.' : ''}
      />
      <TextField
        label="Deadline"
        type="date"
        inputProps={{
          'data-testid': 'todo-form-deadline',
        }}
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={deadline}
        onChange={(e) => updateDeadline(e.target.value)}
        style={{ marginBottom: '1rem' }}
        error={!isDeadlineValid}
        helperText={!isDeadlineValid ? '데드라인은 오늘 이후 날짜로 설정해주세요.' : ''}
      />
      <Button
        data-testid="todo-form-button"
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        fullWidth
        disabled={
          todo.trim().length > MAX_TODO_LENGTH || !deadline || !isDeadlineValid
        }
      >
        Add Todo
      </Button>
    </>
  );
};
