import "./App.css";
import DashboardPage from "./pages/Dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/app-layout";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <AppLayout>
          <DashboardPage />
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
