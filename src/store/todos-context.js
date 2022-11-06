import { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";

const TodosContext = createContext({
  todos: [],
  isLoading: false,
  error: null,
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
  updateTodo: () => {},
});

export const TodosContextPovider = (props) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
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

      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoHandler = async (todoText) => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: todoText,
        isDone: false,
        createdTime: Date.now().toString(),
      });
      console.log("Document written with ID: ", docRef.id);

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const removeTodoHandler = async (todoId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "appliction/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일을 삭제하는데 실패했습니다.");
      }

      await response.json();

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const toggleTodoHandler = async (todoId, todoIsDone) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isDone: !todoIsDone,
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

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const updateTodoHandler = async (todoId, todoText) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_REALTIMEDBURL + `todos/${todoId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            text: todoText,
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

      fetchTodos();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const contextValue = {
    todos: todos,
    isLoading: isLoading,
    error: error,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    toggleTodo: toggleTodoHandler,
    updateTodo: updateTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
