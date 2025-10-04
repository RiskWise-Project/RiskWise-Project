import { createContext, useContext, useState, useEffect } from "react";
import enableDarkMode from "../utils/darkMode.setting";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    enableDarkMode(darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
