import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import MainDashboard from "./Pages/MainDashboard/MainDashboard";

// Components
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import MyOrder from "./Components/MyOrder/MyOrder";
import SupportTickets from "./Components/SupportTickets/SupportTickets";
import MySubscription from "./Components/MySubscription/MySubscription";
import Profile from "./Components/Profile/Profile";
import Payments from "./Components/Payments/Payments";
import Delivery from "./Components/Delivery/Delivery";
import ReferEarn from "./Components/ReferEarn/ReferEarn";
import Notifications from "./Components/Notifications/Notifications";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wdms" element={<MainLayout />}>

            {/* Default Route */}
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />

            {/* Dashboard */}
            <Route
              path="dashboard"
              element={<MainDashboard />}
            />

            {/* My Orders */}
            <Route
              path="orders"
              element={<MyOrder />}
            />

            {/* Support Tickets */}
            <Route
              path="support"
              element={<SupportTickets />}
            />

            {/* Subscription */}
            <Route
              path="subscription"
              element={<MySubscription />}
            />

            {/* Profile */}
            <Route
              path="profile"
              element={<Profile />}
            />

            {/* Delivery */}
            <Route
              path="delivery-address"
              element={<Delivery />}
            />

            {/* Payments */}
            <Route
              path="payments"
              element={<Payments />}
            />
             
            {/* ReferEarn */}
            <Route
              path="refer-earn"
              element={<ReferEarn />} 
            />
            
            {/* Notifications */}
            <Route
              path="notifications"
              element={<Notifications />}
            />

          </Route>
        </Route>

        {/* Redirect Unknown Routes */}
        <Route
          path="*"
          element={<Navigate to="/wdms/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;