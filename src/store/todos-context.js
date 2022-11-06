import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import AuthContext from "./auth-context";

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
  const authContext = useContext(AuthContext);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", authContext.currentUser),
        orderBy("createdTime", "desc")
      );
      const querySnapshot = await getDocs(q);

      const loadedTodos = [];
      querySnapshot.forEach((doc) => {
        loadedTodos.push({
          id: doc.id,
          text: doc.data().text,
          isDone: doc.data().isDone,
          createdTime: doc.data().createdTime,
          userId: doc.data().userId,
        });
      });

      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, [authContext.currentUser]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodoHandler = async (todoText) => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: todoText,
        isDone: false,
        createdTime: Date.now().toString(),
        userId: authContext.currentUser,
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
      await deleteDoc(doc(db, "todos", todoId));

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
      await updateDoc(doc(db, "todos", todoId), {
        isDone: !todoIsDone,
      });

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
      await updateDoc(doc(db, "todos", todoId), {
        text: todoText,
      });

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
