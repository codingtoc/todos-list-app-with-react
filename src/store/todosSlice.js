import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase-config";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const q = query(collection(db, "todos"), orderBy("createdTime", "desc"));
  const querySnapshot = await getDocs(q);

  const loadedTodos = [];
  querySnapshot.forEach((doc) => {
    loadedTodos.push({
      id: doc.id,
      text: doc.data().text,
      isDone: doc.data().isDone,
      createdTime: doc.data().createdTime,
    });
  });

  return loadedTodos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todoText) => {
  const newTodo = {
    text: todoText,
    isDone: false,
    createdTime: Date.now().toString(),
  };
  const docRef = await addDoc(collection(db, "todos"), newTodo);
  console.log("Document written with ID: ", docRef.id);

  return { id: docRef.id, ...newTodo };
});

export const removeTodo = createAsyncThunk(
  "todos/removTodo",
  async (todoId) => {
    await deleteDoc(doc(db, "todos", todoId));

    return todoId;
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, isDone }) => {
    await updateDoc(doc(db, "todos", id), {
      isDone: !isDone,
    });

    return { id: id, isDone: !isDone };
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }) => {
    await updateDoc(doc(db, "todos", id), {
      text: text,
    });

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
      state.todos.unshift(action.payload);
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
