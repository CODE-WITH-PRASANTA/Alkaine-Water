import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Authentication & Protection
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// General Pages
import Dashboards from "./Pages/Dashboards/Dashboards";
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";

import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import AlkaMyProfile from "./Components/AlkaMyProfile/AlkaMyProfile";
import AlkaNotificationSetting from "./Components/AlkaNotificationSetting/AlkaNotificationSetting";
import Settings from "./Components/Settings/Settings";

// Blog Components
import Blog from "./Components/Blog/Blog";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

// WDMS Pages & Components
import DashboardMain from "./Pages/DashboardMain/DashboardMain";
import Orders from "./Pages/Orders/Orders";
import CustomerManage from "./Pages/CustomerManage/CustomerManage";
import RouteManagement from "./Pages/RouteManagement/RouteManagement";
import Inventory from "./Pages/Inventory/Inventory";
import Expense from "./Components/Expense/Expense";
import AddExpense from "./Components/AddExpense/AddExpense";
import ReportsAnalytics from "./Components/ReportsAnalytics/ReportsAnalytics";
import ManageStock from "./Components/ManageStock/ManageStock";
import StockManagement from "./Components/StockManagement/StockManagement";
import Paymentmanagement from "./Components/Paymentmanagement/Paymentmanagement";
import ProductandPrice from "./Components/ProductandPrice/ProductandPrice";
import DeliveryBoyassign from "./Components/DeliveryBoyassign/DeliveryBoyassign";
import DamagedStock from "./Components/DamagedStock/DamagedStock";
import Vehicles from "./Components/Vehicles/Vehicles";
import InvoiceManagement from "./Components/InvoiceManagement/InvoiceManagement";
import LeaveRequest from "./Components/LeaveRequest/LeaveRequest";

// Product Pages
import SubscriptionManagement from "./Pages/SubscriptionManagement/SubscriptionManagement";
import DeliveryId from "./Pages/DeliveryId/DeliveryId";
import Testiminial from "./Components/Testiminial/Testiminial";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            {/* Default Landing Redirect */}
            <Route
              path="/"
              element={<Navigate to="/wdms/dashboard" replace />}
            />

            {/* Main Admin Pages */}
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<ShopPosting />} />
            <Route path="/contact" element={<Contact />} />

            {/* Account & Settings */}
            <Route path="/profile" element={<AlkaMyProfile />} />
            <Route path="/security" element={<AlkaNotificationSetting />} />
            <Route path="/settings" element={<Settings />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-posting" element={<BlogPosting />} />
            <Route path="/blog-management" element={<BlogManagement />} />

            {/* WDMS Module Routes */}
            <Route path="/wdms/dashboard" element={<DashboardMain />} />
            <Route path="/wdms/orders" element={<Orders />} />
            <Route path="/wdms/customer" element={<CustomerManage />} />
            <Route path="/wdms/route-management" element={<RouteManagement />} />
            <Route path="/wdms/inventory" element={<Inventory />} />
            <Route path="/wdms/expenses" element={<Expense />} />
            <Route path="/wdms/add-expenses" element={<AddExpense />} />
            <Route path="/wdms/reports" element={<ReportsAnalytics />} />
            <Route path="/wdms/stock/manage" element={<ManageStock />} />
            <Route path="/wdms/stock/purchase-history" element={<StockManagement />} />
            <Route path="/wdms/payments" element={<Paymentmanagement />} />
            <Route path="/wdms/products-pricing" element={<ProductandPrice />} />
            <Route path="/wdms/assign-delivery" element={<DeliveryBoyassign />} />
            <Route path="/wdms/damage-stock" element={<DamagedStock />} />
            <Route path="/wdms/vehicles" element={<Vehicles />} />
            <Route path="/wdms/invoice" element={<InvoiceManagement />} />
            <Route path="/wdms/leave-request" element={<LeaveRequest />} />

            {/* Products Routes */}
            <Route path="/products/subscription" element={<SubscriptionManagement />} />
            <Route path="/products/id-generate" element={<DeliveryId />} />
            <Route path="/products/testimonials" element={<Testiminial />} />

            {/* Resources Routes */}
            <Route path="/resources/team" element={<OurTeam />} />
            <Route path="/resources/gallery" element={<Gallery />} />

          </Route>
        </Route>

        {/* Catch-all Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;