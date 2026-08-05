import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout & Protection
import MainLayout from "./Layout/MainLayout/MainLayout";
<<<<<<< HEAD
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// Page Components
=======
>>>>>>> 9ee665c253e8ec1ff3b1196f5e422f3858f27a0f
import MainDashboard from "./Pages/MainDashboard/MainDashboard";
import MyOrder from "./Components/MyOrder/MyOrder";
import SupportTickets from "./Components/SupportTickets/SupportTickets";
import MySubscription from "./Components/MySubscription/MySubscription";
import Login from "./Components/Login/Login";
<<<<<<< HEAD
=======
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
>>>>>>> 9ee665c253e8ec1ff3b1196f5e422f3858f27a0f

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