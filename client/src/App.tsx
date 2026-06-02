import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/context/SessionContext";
import Home from "@/pages/Home";

function App() {
  return (
    <SessionProvider>
      <Toaster />
      <Home />
    </SessionProvider>
  );
}

export default App;
