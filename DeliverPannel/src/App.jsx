import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Authentication
import Login from "./Component/Login/Login";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";

// Dashboard
import DashBoard from "./Pages/DashBoard/DashBoard";

// Pages
import Customers from "./Pages/Customers/Customers";
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";
import MyProfile from "./Pages/MyProfile/MyProfile";

// Components
import Orders from "./Component/Orders/Orders";
import Reports from "./Component/Reports/Reports";
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";
import RoutePlanner from "./Component/RoutePlanner/RoutePlanner";
import FailedDelivery from "./Component/FailedDelivery/FailedDelivery";
import ExtraStock from "./Component/ExtraStock/ExtraStock";
import Settings from "./Component/Settings/Settings";
import LeaveApply from "./Component/LeaveApply/LeaveApply";
import LeaveRequest from "./Component/LeaveRequest/LeaveRequest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>

            {/* Redirect */}
            <Route
              index
              element={<Navigate to="/wdms/dashboard" replace />}
            />

            {/* Dashboard */}
            <Route
              path="wdms/dashboard"
              element={<DashBoard />}
            />

            {/* Orders */}
            <Route
              path="wdms/orders"
              element={<Orders />}
            />

            {/* Customers */}
            <Route
              path="wdms/customers"
              element={<Customers />}
            />

            {/* Route Planner */}
            <Route
              path="wdms/route-planner"
              element={<RoutePlanner />}
            />

            {/* Vehicle Stock */}
            <Route
              path="wdms/vehicle-stock"
              element={<VehicleStock />}
            />

            {/* Empty Return */}
            <Route
              path="wdms/empty-return"
              element={<EmptyReturn />}
            />

            {/* Extra Stock */}
            <Route
              path="wdms/extra-stock"
              element={<ExtraStock />}
            />

            {/* Payments */}
            <Route
              path="wdms/payments"
              element={<Payment />}
            />

            {/* Reports */}
            <Route
              path="wdms/reports"
              element={<Reports />}
            />

            {/* Settings */}
            <Route
              path="wdms/settings"
              element={<Settings />}
            />

            {/* Leave Apply */}
            <Route
              path="wdms/leave-apply"
              element={<LeaveApply />}
            />

            {/* Leave Request */}
            <Route
              path="wdms/leave-request"
              element={<LeaveRequest />}
            />

            {/* Failed Delivery */}
            <Route
              path="wdms/failed-delivery"
              element={<FailedDelivery />}
            />

            {/* Profile */}
            <Route
              path="wdms/profile"
              element={<MyProfile />}
            />

          </Route>
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;