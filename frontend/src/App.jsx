import { useEffect, useState } from "react";
import "./App.css";
import MainRoutes from "./routes/main-routes";
import enableDarkMode from "./utils/darkMode.setting";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    enableDarkMode(darkMode);
  }, [darkMode]);

  return (
    <div>
      <MainRoutes />
    </div>
  );
}

export default App;
