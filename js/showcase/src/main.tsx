import ReactDOM from "react-dom/client";
import React from "react";
import "./styles.css";

const root = document.getElementById("root");

if (!root) {
  alert("No root element");
  throw "No root element";
}

ReactDOM.createRoot(root).render(<React.StrictMode></React.StrictMode>);
