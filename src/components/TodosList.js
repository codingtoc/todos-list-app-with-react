import { Fragment } from "react";
import TodoItem from "./TodoItem";

const TodosList = () => {
  return (
    <Fragment>
      <TodoItem />
      <TodoItem />
    </Fragment>
  );
};

export default TodosList;
