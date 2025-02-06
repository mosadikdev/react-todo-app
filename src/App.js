import { useState, useRef, useContext } from 'react';
import { TodoContext } from "./context/TodoContext";
import './App.css';

function App() {
  const { todos, dispatch } = useContext(TodoContext); 
  const [todoInput, setTodoInput] = useState('');
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const addTodo = () => {
    if (todoInput.trim()) {
      const exists = todos.some(todo => todo.text.toLowerCase() === todoInput.toLowerCase());

      if (exists) {
        setError("This Task already exists");
        return;
      }

      dispatch({ type: "ADD", payload: { text: todoInput} });
      inputRef.current.focus();
      setTodoInput("");
      setError("");
  }
};



  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: "DELETE", payload: id });
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

        {error && <p className="text-red-500 text-center">{error}</p>}


        <ul className="space-y-2">
          {todos.map((td) => (
            <li
              key={td.id}
              className="flex items-center p-2 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input
                type="checkbox"
                checked={td.completed}
                onChange={() =>  dispatch({ type: "TOGGLE", payload: td.id })}
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
