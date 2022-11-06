import { Button, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

import TodosContext from "../store/todos-context";

const NewTodo = () => {
  const [todoText, setTodoText] = useState("");
  const todosContext = useContext(TodosContext);

  const todoTextChangeHandler = (event) => {
    setTodoText(event.target.value);
  };

  const addTodoSubmitHandler = (event) => {
    event.preventDefault();

    if (todoText.trim().length === 0) {
      return;
    }

    todosContext.addTodo(todoText);
    setTodoText("");
  };

  return (
    <Paper elevation={3} sx={{ margin: "10px 0", padding: "10px" }}>
      <Typography variant="h5" component="div">
        할일 추가
      </Typography>
      <form onSubmit={addTodoSubmitHandler}>
        <TextField
          label="신규 할일을 입력하세요."
          variant="filled"
          fullWidth
          margin="normal"
          onChange={todoTextChangeHandler}
          value={todoText}
        />
        <Button variant="contained" type="submit">
          추가
        </Button>
      </form>
    </Paper>
  );
};

export default NewTodo;
