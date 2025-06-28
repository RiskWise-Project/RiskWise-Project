function enableDarkMode(isEnabled) {
  const html = document.documentElement;
  if (isEnabled) {
    html.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
}

// Run immediately to apply saved mode globally
if (typeof window !== "undefined") {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    document.documentElement.classList.add("dark");
  }
}

export default enableDarkMode;
