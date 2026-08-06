import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout & Protection
import MainLayout from "./Layout/MainLayout/MainLayout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// Page Components
import MainDashboard from "./Pages/MainDashboard/MainDashboard";
import MyOrder from "./Components/MyOrder/MyOrder";
import SupportTickets from "./Components/SupportTickets/SupportTickets";
import MySubscription from "./Components/MySubscription/MySubscription";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Panel */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wdms" element={<MainLayout />}>
            {/* Default Route for /wdms */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Dashboard */}
            <Route 
              path="dashboard" 
              element={<MainDashboard />} 
            />

            {/* Orders */}
            <Route 
              path="orders" 
              element={<MyOrder />} 
            />

            {/* Support */}
            <Route 
              path="support" 
              element={<SupportTickets />} 
            />

            {/* Subscription */}
            <Route 
              path="subscription" 
              element={<MySubscription />} 
            />
          </Route>
        </Route>

        {/* Fallback for Unknown URLs */}
        <Route 
          path="*" 
          element={<Navigate to="/wdms/dashboard" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;