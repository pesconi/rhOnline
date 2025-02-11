import React from "react";
import ReactDOM from "react-dom/client";
import "./importStyles"; // Import the dynamic import script
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./hooks/auth";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* <BrowserRouter basename={"/rhonline"}> */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode >
);
