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

export const removeTodo = createAsyncThunk(
  "todos/removTodo",
  async (todoId) => {
    const response = await fetch(
      process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await response.json();

    return todoId;
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, isDone }) => {
    const response = await fetch(
      process.env.REACT_APP_REALTIMEDBURL + `todos/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          isDone: !isDone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("할일의 완료여부를 수정하는데 실패했습니다.");
    }

    await response.json();

    return { id: id, isDone: !isDone };
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }) => {
    const response = await fetch(
      process.env.REACT_APP_REALTIMEDBURL + `todos/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          text: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("할일을 수정하는데 실패했습니다.");
    }

    await response.json();

    return {
      id: id,
      text: text,
    };
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
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
    builder.addCase(removeTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(removeTodo.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(toggleTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex].isDone = action.payload.isDone;
      state.isLoading = false;
    });
    builder.addCase(toggleTodo.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex].text = action.payload.text;
      state.isLoading = false;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default todosSlice.reducer;
