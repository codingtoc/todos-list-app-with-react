import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    process.env.REACT_APP_REALTIMEDBURL + "todos.json"
  );

  if (!response.ok) {
    throw new Error("할일을 추가하는데 실패했습니다.");
  }

  const data = await response.json();

  const loadedTodos = [];
  for (const key in data) {
    loadedTodos.push({
      id: key,
      text: data[key].text,
      isDone: data[key].isDone,
    });
  }

  return loadedTodos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todoText) => {
  const response = await fetch(
    process.env.REACT_APP_REALTIMEDBURL + "todos.json",
    {
      method: "POST",
      body: JSON.stringify({
        text: todoText,
        isDone: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("할일을 추가하는데 실패했습니다.");
  }

  const data = await response.json();

  return {
    id: data.name,
    text: todoText,
    isDone: false,
  };
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const { removeTodo, toggleTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;
