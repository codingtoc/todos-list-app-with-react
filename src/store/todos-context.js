import { createContext, useState } from "react";

const TodosContext = createContext({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
  updateTodo: () => {},
});

export const TodosContextPovider = (props) => {
  const [todos, setTodos] = useState([]);

  const addTodoHandler = (todoText) => {
    setTodos((prevTodos) => {
      return prevTodos.concat({
        id: Date.now().toString(),
        text: todoText,
        isDone: false,
      });
    });
  };

  const removeTodoHandler = (todoId) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const toggleTodoHandler = (todoId, todoIsDone) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex((todo) => todo.id === todoId);
      newTodos[todoIndex].isDone = !todoIsDone;

      return newTodos;
    });
  };

  const updateTodoHandler = (todoId, todoText) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex((todo) => todo.id === todoId);
      newTodos[todoIndex].text = todoText;

      return newTodos;
    });
  };

  const contextValue = {
    todos: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    toggleTodo: toggleTodoHandler,
    updateTodo: updateTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
