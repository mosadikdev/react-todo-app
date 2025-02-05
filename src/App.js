import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const inputRef = useRef(null);

  const addTodo = () => {
    if (todoInput.trim() && !todos.some((t) => t.text === todoInput.trim())) {
      setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
      setTodoInput('');
      inputRef.current.focus();
    } else if (!todoInput.trim()) {
      alert('Please write a task before adding!');
    } else {
      alert('This task already exists!');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-400">
      <div className="bg-white shadow-xl rounded-3xl p-16">
        <h1 className="text-center text-3xl text-gray-900 font-bold mb-6">React Todo App 📝</h1>
        <div className="mb-4 flex">
          <input
            id="todoinput"
            type="text"
            placeholder="Write your todo here"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            ref={inputRef}
            className="border px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            id="todobtn"
            onClick={addTodo}
            className="bg-gray-500 px-4 py-2 text-white text-center rounded-r-lg hover:bg-gray-600"
          >
            ADD
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((td) => (
            <li
              key={td.id}
              className="flex items-center p-2 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input
                type="checkbox"
                checked={td.completed}
                onChange={() => toggleTodo(td.id)}
                className="mr-2 h-5 w-5 text-gray-600"
              />
              <span
                className={`flex-grow ${
                  td.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {td.text}
              </span>
              <button
                className="ml-2 border-none bg-red-500 hover:bg-red-600 px-2 text-white rounded-lg"
                onClick={() => deleteTodo(td.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
