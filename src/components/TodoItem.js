import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { removeTodo } from "../store/todosSlice";

const TodoItem = (props) => {
  const dispatch = useDispatch();

  const removeTodoClickHandler = () => {
    dispatch(removeTodo(props.todo.id));
  };

  return (
    <Card sx={{ margin: "10px 0" }}>
      <CardActionArea>
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
