import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import './i18n/config';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Agencies from "./pages/Agencies";
import AgencyDetails from "./pages/AgencyDetails";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import DashboardProperties from "./pages/DashboardProperties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/agencies/:id" element={<AgencyDetails />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Protected Agency Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireAgency>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/properties" 
              element={
                <ProtectedRoute requireAgency>
                  <DashboardProperties />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/properties/add" 
              element={
                <ProtectedRoute requireAgency>
                  <AddProperty />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/properties/edit/:id" 
              element={
                <ProtectedRoute requireAgency>
                  <EditProperty />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
