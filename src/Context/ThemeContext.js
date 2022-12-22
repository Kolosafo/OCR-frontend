import { createContext } from "react";

export const themes = {
  dark: {
    height: "100vh",
    width: "99vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    backgroundColor: "#373638",
  },
  light: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "99vw",
    color: "#373638",
    backgroundColor: "white",
  },
};

const ThemeContext = createContext(themes.dark);

export default ThemeContext;
