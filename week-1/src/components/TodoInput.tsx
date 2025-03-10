import { useState } from 'react';
import { validateResult } from '../utils/utils';

interface TodoInputProps {
  onAddTodo: (task: string, deadline: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [error, setError] = useState<string>('');
  const today = new Date().toISOString().split('T')[0];

  const handleAddTodo = () => {
    if (!validateResult(task, deadline)) {
      setError('입력된 할 일이 없거나 마감일이 오늘 이전입니다.');
      return;
    }
    onAddTodo(task, deadline);
    setTask('');
    setDeadline('');
    setError('');
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 bg-gray-100 rounded-xl shadow-md">
      <label htmlFor="task" className="text-gray-800 font-semibold text-lg">
        해야 할 일
      </label>
      <input
        type="text"
        id="task"
        placeholder="예: 운동하기, 공부하기"
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition w-full"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <label htmlFor="deadline" className="text-gray-800 font-semibold text-lg">
        마감일
      </label>
      <input
        type="date"
        id="deadline"
        value={deadline}
        min={today}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition w-full"
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button
        onClick={handleAddTodo}
        className="p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-800 transition shadow-md"
      >
        ➕ 추가하기
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-3 flex items-center bg-red-100 p-2 rounded-lg shadow-sm">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default TodoInput;
