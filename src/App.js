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

  return (
    <Container fixed>
      <NewTodo onAddTodo={addTodoHandler} />
      <TodosList todos={todos} />
    </Container>
  );
}

export default App;
