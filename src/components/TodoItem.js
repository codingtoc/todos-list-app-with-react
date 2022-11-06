import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";

import TodosContext from "../store/todos-context";

const TodoItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todoText, setTodoText] = useState(props.todo.text);
  const todosContext = useContext(TodosContext);

  const removeTodoClickHandler = () => {
    todosContext.removeTodo(props.todo.id);
  };

  const toggleTodoClickHandler = () => {
    todosContext.toggleTodo(props.todo.id, props.todo.isDone);
  };

  const dialogOpenClickHandler = () => {
    setIsOpen(true);
  };

  const dialogCloseClickHandler = () => {
    setIsOpen(false);
    setTodoText(props.todo.text);
  };

  const todoTextChangeHandler = (event) => {
    setTodoText(event.target.value);
  };

  const updateTodoClickHandler = () => {
    if (todoText.trim().length === 0) {
      return;
    }

    todosContext.updateTodo(props.todo.id, todoText);
    setIsOpen(false);
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
        <Button variant="contained" onClick={dialogOpenClickHandler}>
          수정
        </Button>
        <Dialog open={isOpen} onClose={dialogCloseClickHandler}>
          <DialogTitle>할일 수정</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="기존 할일을 수정하세요."
              variant="standard"
              fullWidth
              margin="dense"
              onChange={todoTextChangeHandler}
              value={todoText}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={dialogCloseClickHandler}
            >
              취소
            </Button>
            <Button variant="contained" onClick={updateTodoClickHandler}>
              수정
            </Button>
          </DialogActions>
        </Dialog>
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
