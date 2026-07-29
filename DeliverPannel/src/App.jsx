import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import DashBoard from "./Pages/DashBoard/DashBoard";
import Customers from "./Pages/Customers/Customers";
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";
import MyProfile from "./Pages/MyProfile/MyProfile";

// Components
import Reports from "./Component/Reports/Reports";
import Orders from "./Component/Orders/Orders";
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";
import RoutePlanner from "./Component/RoutePlanner/RoutePlanner";
import FailedDelivery from "./Component/FailedDelivery/FailedDelivery";
import ExtraStock from "./Component/ExtraStock/ExtraStock";
import Settings from "./Component/Settings/Settings";
import LeaveApply from "./Component/LeaveApply/LeaveApply";
import LeaveRequest from "./Component/LeaveRequest/LeaveRequest";

// Authentication
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Login from "./Component/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Wrapped with ProtectedRoute & MainLayout) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            {/* Dashboard Default & Route */}
            <Route index element={<DashBoard />} />
            <Route path="wdms/dashboard" element={<DashBoard />} />

            {/* WDMS Module Routes */}
            <Route path="wdms/orders" element={<Orders />} />
            <Route path="wdms/route-planner" element={<RoutePlanner />} />
            <Route path="wdms/customers" element={<Customers />} />
            <Route path="wdms/vehicle-stock" element={<VehicleStock />} />
            <Route path="wdms/empty-return" element={<EmptyReturn />} />
            <Route path="wdms/extra-stock" element={<ExtraStock />} />
            <Route path="wdms/leave-apply" element={<LeaveApply />} />
            <Route path="wdms/leave-request" element={<LeaveRequest />} />
            <Route path="wdms/payments" element={<Payment />} />
            <Route path="wdms/reports" element={<Reports />} />
            <Route path="wdms/settings" element={<Settings />} />
            <Route path="wdms/profile" element={<MyProfile />} />

            {/* Additional / Fallback Helper Routes */}
            <Route path="fail" element={<FailedDelivery />} />
            <Route path="emptyreturn" element={<EmptyReturn />} />
          </Route>
        </Route>

        {/* 404 Catch-All Page */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;