import { useState, useEffect } from "react";
import { getAll } from "./api/vacationRequests";
import "./App.css";
import DashboardPage from "./pages/Dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/app-layout";

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        setRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error connecting to backend", error);
      }
    };

    fetchData();
  }, []);

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
