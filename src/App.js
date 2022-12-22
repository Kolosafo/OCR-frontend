import Main from "./Main";
import "./App.css";
import ThemeContext, { themes } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Main />
    </ThemeContext.Provider>
  );
}

export default App;
