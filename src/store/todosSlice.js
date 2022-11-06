import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "t1", text: "Learn React", isDone: true },
    { id: "t2", text: "Learn TypeScript", isDone: false },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        isDone: false,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex].isDone = !action.payload.isDone;
    },
    updateTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex].text = action.payload.text;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
