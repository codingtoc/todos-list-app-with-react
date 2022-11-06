import { Alert, Box, CircularProgress, List } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTodos } from "../store/todosSlice";
import TodoItem from "./TodoItem";

const TodosList = () => {
  const { todos, isLoading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(fetchTodos(currentUser));
  }, [dispatch, currentUser]);

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
      <List>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    );
  } else {
    content = <Alert severity="info">조회된 할일 목록이 없습니다.</Alert>;
  }

  return content;
};

export default TodosList;
