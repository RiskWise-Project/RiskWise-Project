import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./utils/i18n.js";
import App from "./App.jsx";
<<<<<<< HEAD
import { NotificationProvider } from "./context/notification-context.jsx";
import { ThemeProvider } from "./context/theme-context.jsx";
=======
import { NotificationProvider } from "./context/NotificationContext.jsx";
>>>>>>> 809cc65b7a756daa5b8871436ac68d9adaeb4cce

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <NotificationProvider>
<<<<<<< HEAD
        <ThemeProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
=======
        <App />
        <Toaster position="top-right" reverseOrder={false} />
>>>>>>> 809cc65b7a756daa5b8871436ac68d9adaeb4cce
      </NotificationProvider>
    </StrictMode>
  </BrowserRouter>
);
