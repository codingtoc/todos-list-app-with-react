import { Container } from "@mui/material";
import { useContext } from "react";

import HeaderAppBar from "./components/HeaderAppBar";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import AuthContext from "./store/auth-context";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Container fixed>
      <HeaderAppBar />
      {authContext.currentUser && <NewTodo />}
      <TodosList />
    </Container>
  );
}

export default App;
