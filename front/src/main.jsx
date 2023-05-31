import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

//Librerias
import { BrowserRouter } from "react-router-dom";



import App from "./App.jsx";
import store from "./redux/store.js";
//import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>  
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    </Provider>
);
