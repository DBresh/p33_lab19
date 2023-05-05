import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import Pagination from "./Components/Pagination";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <React.StrictMode>
            <AppRouter />
        </React.StrictMode>
    </BrowserRouter>
);
