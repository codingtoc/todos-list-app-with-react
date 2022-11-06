import { List } from "@mui/material";
import { useContext } from "react";

import TodosContext from "../store/todos-context";
import TodoItem from "./TodoItem";

const TodosList = () => {
  const todosContext = useContext(TodosContext);

  return (
    <List>
      {todosContext.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodosList;
