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
import Notifications from "./Components/Notifications/Notifications";
import Profile from "./Components/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wdms" element={<MainLayout />}>
            {/* Default redirect for /wdms */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Dashboard & Modules */}
            <Route path="dashboard" element={<MainDashboard />} />
            <Route path="orders" element={<MyOrder />} />
            <Route path="support" element={<SupportTickets />} />
            <Route path="subscription" element={<MySubscription />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback for Unknown URLs */}
        <Route path="*" element={<Navigate to="/wdms/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;