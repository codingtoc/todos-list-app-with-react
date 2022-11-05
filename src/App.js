import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import { db } from "./firebase-config";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const q = query(collection(db, "todos"), orderBy("createdTime", "desc"));
      const querySnapshot = await getDocs(q);

      const loadedTodos = [];
      querySnapshot.forEach((doc) => {
        loadedTodos.push({
          id: doc.id,
          text: doc.data().text,
          isDone: doc.data().isDone,
          createdTime: doc.data().createdTime,
        });
      });

      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoHandler = async (todoText) => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: todoText,
        isDone: false,
        createdTime: Date.now().toString(),
      });
      console.log("Document written with ID: ", docRef.id);

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const removeTodoHandler = async (todoId) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteDoc(doc(db, "todos", todoId));

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const toggleTodoHandler = async (todoId, todoIsDone) => {
    setIsLoading(false);
    setError(null);

    try {
      await updateDoc(doc(db, "todos", todoId), {
        isDone: !todoIsDone,
      });

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const updateTodoHandler = async (todoId, todoText) => {
    setIsLoading(false);
    setError(null);

    try {
      await updateDoc(doc(db, "todos", todoId), {
        text: todoText,
      });

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  let content;
  if (error) {
    content = <Alert severity="error">{error}</Alert>;
  } else if (isLoading) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (todos.length > 0) {
    content = (
      <TodosList
        todos={todos}
        onRemoveTodo={removeTodoHandler}
        onToggleTodo={toggleTodoHandler}
        onUpdateTodo={updateTodoHandler}
      />
    );
  } else {
    content = <Alert severity="info">조회된 할일 목록이 없습니다.</Alert>;
  }

  return (
    <Container fixed>
      <NewTodo onAddTodo={addTodoHandler} />
      {content}
    </Container>
  );
}

export default App;
