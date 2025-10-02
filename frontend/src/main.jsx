import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./utils/i18n.js";
import App from "./App.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <NotificationProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </NotificationProvider>
    </StrictMode>
  </BrowserRouter>
);
