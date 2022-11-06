import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext } from "react";

import TodosContext from "../store/todos-context";

const TodoItem = (props) => {
  const todosContext = useContext(TodosContext);

  const removeTodoClickHandler = () => {
    todosContext.removeTodo(props.todo.id);
  };

  const toggleTodoClickHandler = () => {
    todosContext.toggleTodo(props.todo.id, props.todo.isDone);
  };

  return (
    <Card sx={{ margin: "10px 0" }}>
      <CardActionArea onClick={toggleTodoClickHandler}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ textDecoration: props.todo.isDone ? "line-through" : "" }}
          >
            {props.todo.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained">수정</Button>
        <Button
          variant="contained"
          color="warning"
          onClick={removeTodoClickHandler}
        >
          삭제
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItem;
