import { Container } from "@mui/material";
import { useState } from "react";

import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";

function App() {
  const [todos, setTodos] = useState([
    { id: "t1", text: "Learn React", isDone: true },
    { id: "t2", text: "Learn TypeScript", isDone: false },
  ]);

  return (
    <Container fixed>
      <NewTodo />
      <TodosList todos={todos} />
    </Container>
  );
}

export default App;
