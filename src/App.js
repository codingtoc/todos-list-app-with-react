import { Container } from "@mui/material";

import HeaderAppBar from "./components/HeaderAppBar";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";

function App() {
  return (
    <Container fixed>
      <HeaderAppBar />
      <NewTodo />
      <TodosList />
    </Container>
  );
}

export default App;
