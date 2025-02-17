import React from "react";
import ReactDOM from "react-dom/client";
import "./importStyles"; // Import the dynamic import script
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SaveCliente } from "./components/utils";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <BrowserRouter basename={"/rhonline"}> */}
      <SaveCliente />
      <App />
    </BrowserRouter>
  </React.StrictMode >
);
