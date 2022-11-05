import { List } from "@mui/material";
import TodoItem from "./TodoItem";

const TodosList = () => {
  return (
    <List>
      <TodoItem />
      <TodoItem />
    </List>
  );
};

export default TodosList;
