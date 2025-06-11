import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/queryClient";
import { ToastContainer } from "react-toastify";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "@/pages/HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
            </Routes>
          </BrowserRouter>

          <ToastContainer 
            theme="colored"
            className="dark:[&_.Toastify__toast]:bg-gray-800 dark:[&_.Toastify__toast]:text-white"
          />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
