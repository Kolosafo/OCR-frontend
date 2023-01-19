import { createContext } from "react";

export const themes = {
  dark: {
    height: "140vh",
    width: "98vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    backgroundColor: "#373638",
  },
  light: {
    height: "140vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "98vw",
    color: "#373638",
    backgroundColor: "white",
  },
};

const ThemeContext = createContext(themes.dark);

export default ThemeContext;
