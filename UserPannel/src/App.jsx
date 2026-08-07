import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import MainDashboard from "./Pages/MainDashboard/MainDashboard";
import MyOrder from "./Components/MyOrder/MyOrder";
import SupportTickets from "./Components/SupportTickets/SupportTickets";
import MySubscription from "./Components/MySubscription/MySubscription";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Notifications from "./Components/Notifications/Notifications";
import Profile from "./Components/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Panel */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wdms" element={<MainLayout />}>

            {/* Default */}
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
           <Route
           path="/wdms/notifications"
           element={<Notifications/>}
           />
           <Route
           path="/wdms/profile"
           element={<Profile/>}/>
          </Route>
        </Route>

        {/* Unknown URL */}
        <Route 
          path="*" 
          element={<Navigate to="/wdms/dashboard" replace />} 
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;