import { Fragment } from "react";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";

function App() {
  return (
    <Fragment>
      <NewTodo />
      <TodosList />
    </Fragment>
  );
}

export default App;
