import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";

import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + "todos.json"
      );

      if (!response.ok) {
        throw new Error("할일 데이터 목록을 가져오는데 실패했습니다.");
      }

      const data = await response.json();

      const loadedTodos = [];
      for (const key in data) {
        loadedTodos.push({
          id: key,
          text: data[key].text,
          isDone: data[key].isDone,
        });
      }

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
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + "todos.json",
        {
          method: "POST",
          body: JSON.stringify({
            text: todoText,
            isDone: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일을 추가하는데 실패했습니다.");
      }

      await response.json();

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
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일을 삭제하는데 실패했습니다.");
      }

      await response.json();

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
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isDone: !todoIsDone,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일의 완료여부를 업데이트하는데 실패했습니다.");
      }

      await response.json();

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
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            text: todoText,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일을 수정하는데 실패했습니다.");
      }

      await response.json();

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
