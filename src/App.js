import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
