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

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wdms" element={<MainLayout />}>
            {/* Default Route for /wdms */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Dashboard Sub-routes */}
            <Route path="dashboard" element={<MainDashboard />} />
            <Route path="orders" element={<MyOrder />} />
            <Route path="support" element={<SupportTickets />} />
            <Route path="subscription" element={<MySubscription />} />
          </Route>
        </Route>

        {/* Redirect root URL "/" to dashboard */}
        <Route path="/" element={<Navigate to="/wdms/dashboard" replace />} />

        {/* Catch-all route for unknown URLs */}
        <Route path="*" element={<Navigate to="/wdms/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;