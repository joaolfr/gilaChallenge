import { DataFetcher } from "./components/DataFetcher";
import { ThemeProvider } from "./context/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <DataFetcher />
    </ThemeProvider>
  );
}
