import "./App.css";
import DashboardPage from "./pages/Dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/app-layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./auth/AuthProvider";
const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
