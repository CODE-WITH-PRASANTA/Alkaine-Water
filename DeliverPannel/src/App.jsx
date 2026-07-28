import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Customers from "./Pages/Customers/Customers";
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";

// Components

import Reports from "./Component/Reports/Reports";
import Orders from "./Component/Orders/Orders";
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";
import RoutePlanner from "./Component/RoutePlanner/RoutePlanner";
import FailedDelivery from "./Component/FailedDelivery/FailedDelivery";
import ExtraStock from "./Component/ExtraStock/ExtraStock";
import Settings from "./Component/Settings/Settings";

// Authentication
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Login from "./Component/Login/Login";
import MyProfile from "./Pages/MyProfile/MyProfile";
import DashBoard from "./Pages/DashBoard/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            {/* Default Dashboard */}
            <Route index element={<DashBoard/>} />

            {/* Dashboard Route */}
            <Route path="wdms/dashboard" element={<DashBoard/>}/>

            {/* Other Routes */}
            <Route path="fail" element={<FailedDelivery />} />
            <Route path="wdms/customers" element={<Customers />} />
            <Route path="wdms/vehicle-stock" element={<VehicleStock />} />
            <Route path="wdms/payments" element={<Payment />} />
            <Route path="wdms/orders" element={<Orders />} />
            <Route path="wdms/reports" element={<Reports />} />
            <Route path="wdms/settings" element={<Settings />} />
            <Route path="wdms/extra-stock" element={<ExtraStock />} />
            <Route path="wdms/empty-return" element={<EmptyReturn />} />
            <Route path="wdms/route-planner" element={<RoutePlanner />} />
            <Route path="/wdms/profile" element={<MyProfile />} />

            {/* Optional Route */}
            <Route path="emptyreturn" element={<EmptyReturn />} />
          </Route>
        </Route>

        {/* 404 Page */}
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