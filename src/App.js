import { Container } from "@mui/material";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";

function App() {
  return (
    <Container fixed>
      <NewTodo />
      <TodosList />
    </Container>
  );
}

export default App;
