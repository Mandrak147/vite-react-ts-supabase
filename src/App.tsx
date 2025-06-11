import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

import { queryClient } from "./libs/queryClient";
import { ProtectedRoute } from "./ProtectedRoute";

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
