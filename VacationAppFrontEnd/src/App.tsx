import { useState, useEffect } from "react";
import { getAll } from "./api/vacationRequests";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import Page from "./app/dashboard/page";
import { TooltipProvider } from "@/components/ui/tooltip";

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
      <div>
        <Page />
      </div>
    </TooltipProvider>
  );
}

export default App;
