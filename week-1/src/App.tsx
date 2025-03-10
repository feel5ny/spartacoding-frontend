import { useState } from 'react';
import TodoInput from './components/TodoInput';

function App() {
  const [todos, setTodos] = useState<
    { id: number; text: string; deadline: string; completed: boolean }[]
  >([]);

  const addTodo = (task: string, deadline: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), text: task, deadline, completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">✅ Todo List</h2>

      <TodoInput onAddTodo={addTodo} />

      <ul className="mt-6 w-full list-none" style={{ listStyle: 'none' }}>
        {todos.map(({ id, text, deadline, completed }) => (
          <li
            key={id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200 my-2 transition hover:bg-gray-100"
          >
            <div className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodo(id)}
                className="w-6 h-6 cursor-pointer accent-blue-600 transition-all duration-300"
              />
              <span
                className={`text-lg font-medium flex-1 transition-all duration-300 ease-in-out ${
                  completed
                    ? 'line-through decoration-gray-400 text-gray-400 opacity-50'
                    : 'text-gray-900'
                }`}
                style={{
                  textDecoration: completed ? 'line-through' : 'none',
                  opacity: completed ? 0.5 : 1,
                }}
              >
                {text}
              </span>
              <span
                className="text-sm text-gray-500 ml-auto"
                style={{
                  textDecoration: completed ? 'line-through' : 'none',
                  opacity: completed ? 0.5 : 1,
                }}
              >{`(마감일: ${deadline})`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
