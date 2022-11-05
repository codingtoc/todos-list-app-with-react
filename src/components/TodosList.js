import { List } from "@mui/material";

import TodoItem from "./TodoItem";

const TodosList = (props) => {
  return (
    <List>
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={props.onRemoveTodo}
          onToggleTodo={props.onToggleTodo}
        />
      ))}
    </List>
  );
};

export default TodosList;
