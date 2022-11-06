import { List } from "@mui/material";
import { useSelector } from "react-redux";

import TodoItem from "./TodoItem";

const TodosList = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodosList;
