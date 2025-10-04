import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./utils/i18n.js";
import App from "./App.jsx";
import { NotificationProvider } from "./context/notification-context.jsx";
import { ThemeProvider } from "./context/theme-context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <NotificationProvider>
        <ThemeProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
      </NotificationProvider>
    </StrictMode>
  </BrowserRouter>
);
