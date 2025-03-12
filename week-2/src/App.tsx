/**
 *
 * @tasks
 * 1. TodoInput 작성
 * 2. Task 입력시 100자 제한
 * 3. Deadline이 오늘 이전이면 불가 -> 2,3번 Hook + Testcode
 *
 * @commitSequence
 * 1. TestCode 작성
 * 2. 실제 구현
 * 3. 1,2번 사이클 반복
 *
 * @pullReqeustTest
 */

import { useEffect, useState } from 'react';
import useTodoValidation from './hooks/useTodoValidation';

function App() {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const { error, validate } = useTodoValidation();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const today = new Date().toISOString().split('T')[0];

  const handleAddTodo = () => {
    if (!validate(task, deadline)) return;
    setTask('');
    setDeadline('');
  };

  useEffect(() => {
    setButtonDisabled(!validate(task, deadline));
  }, [task, deadline]);

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">✅ Todo List</h2>
      <div className="flex flex-col w-full gap-4 p-4 bg-gray-100 rounded-xl shadow-md">
        <input
          type="text"
          data-testid="task-input"
          placeholder="할 일을 입력하세요 (최대 100자)"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition w-full"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          maxLength={100}
        />
        <input
          type="date"
          data-testid="task-date"
          value={deadline}
          min={today}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition w-full"
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button
          data-testid="submit-button"
          onClick={handleAddTodo}
          disabled={buttonDisabled}
          className="p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          ➕ 추가하기
        </button>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>{' '}
    </div>
  );
}

export default App;
