import { createContext, useEffect, useReducer } from "react";


export const TodoContext = createContext();


const loadTodosFromStorage = () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  };



  const todoReducer = (state, action) => {
    let updatedTodos;
    
    switch (action.type) {
      case "ADD":
        updatedTodos = [...state, { id: Date.now(), text: action.payload.text, completed: false }];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
  
      case "DELETE":
        updatedTodos = state.filter(todo => todo.id !== action.payload);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
  
      case "TOGGLE":
        updatedTodos = state.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
  
      default:
        return state;
    }
  };


  export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, loadTodosFromStorage());
  
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
  
    return (
      <TodoContext.Provider value={{ todos, dispatch }}>
        {children}
      </TodoContext.Provider>
    );
  };


