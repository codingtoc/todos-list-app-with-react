import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodosContextPovider } from "./store/todos-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodosContextPovider>
    <App />
  </TodosContextPovider>
);
