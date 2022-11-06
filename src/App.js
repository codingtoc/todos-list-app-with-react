import { Container } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import HeaderAppBar from "./components/HeaderAppBar";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { auth } from "./firebase-config";
import { login, logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user.uid));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Container fixed>
      <HeaderAppBar />
      <NewTodo />
      <TodosList />
    </Container>
  );
}

export default App;
