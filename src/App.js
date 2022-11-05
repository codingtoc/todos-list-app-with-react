import { Container } from "@mui/material";
import { useState } from "react";

import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";

function App() {
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

  return (
    <Container fixed>
      <NewTodo onAddTodo={addTodoHandler} />
      <TodosList todos={todos} onRemoveTodo={removeTodoHandler} />
    </Container>
  );
}

export default App;
