import { Toaster } from "./components/ui/toaster";
import JeopardyBoard from "./JeopardyBoard";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JeopardyBoard />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
