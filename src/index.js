import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { TodosContextPovider } from "./store/todos-context";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <TodosContextPovider>
      <App />
    </TodosContextPovider>
  </AuthContextProvider>
);
