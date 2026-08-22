import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Authentication
import Login from "./Component/Login/Login";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";

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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin/App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>

            {/* Default Landing Redirect */}
            <Route
              index
              element={<Navigate to="/wdms/dashboard" replace />}
            />

            {/* WDMS Modules */}
            <Route path="wdms/dashboard" element={<DashBoard />} />
            <Route path="wdms/orders" element={<Orders />} />
            <Route path="wdms/customers" element={<Customers />} />
            <Route path="wdms/route-planner" element={<RoutePlanner />} />
            <Route path="wdms/vehicle-stock" element={<VehicleStock />} />
            <Route path="wdms/empty-return" element={<EmptyReturn />} />
            <Route path="wdms/extra-stock" element={<ExtraStock />} />
            <Route path="wdms/payments" element={<Payment />} />
            <Route path="wdms/reports" element={<Reports />} />
            <Route path="wdms/settings" element={<Settings />} />
            <Route path="wdms/leave-apply" element={<LeaveApply />} />
            <Route path="wdms/leave-request" element={<LeaveRequest />} />
            <Route path="wdms/failed-delivery" element={<FailedDelivery />} />
            <Route path="wdms/profile" element={<MyProfile />} />

            {/* Helper Aliases */}
            <Route path="fail" element={<FailedDelivery />} />
            <Route path="emptyreturn" element={<EmptyReturn />} />

          </Route>
        </Route>

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;