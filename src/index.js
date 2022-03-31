import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./pages/App";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App />);
