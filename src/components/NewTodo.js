import { Button, Paper, TextField, Typography } from "@mui/material";

const NewTodo = () => {
  return (
    <Paper elevation={3} sx={{ margin: "10px 0", padding: "10px" }}>
      <Typography variant="h5" component="div">
        할일 추가
      </Typography>
      <TextField
        label="신규 할일을 입력하세요."
        variant="filled"
        fullWidth
        margin="normal"
      />
      <Button variant="contained">추가</Button>
    </Paper>
  );
};

export default NewTodo;
