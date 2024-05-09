import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EmployeeState from "./contextstate/EmployeeState.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeeState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EmployeeState>
  </React.StrictMode>
);
