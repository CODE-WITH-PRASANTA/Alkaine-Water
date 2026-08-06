import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Components / Pages
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";
import Testimonial from "./pages/Testimonial/Testimonial";
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import Dashboards from "./Pages/Dashboards/Dashboards";
import Blog from "./Components/Blog/Blog";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import DashboardMain from "./Pages/DashboardMain/DashboardMain";
import Paymentmanagement from "./Components/Paymentmanagement/Paymentmanagement";
import ProductandPrice from "./Components/ProductandPrice/ProductandPrice";
import InvoiceManagement from "./Components/InvoiceManagement/InvoiceManagement";
import DeliveryBoyassign from "./Components/DeliveryBoyassign/DeliveryBoyassign";
import DamagedStock from "./Components/DamagedStock/DamagedStock";
import Expense from "./Components/Expense/Expense";
import ReportsAnalytics from "./Components/ReportsAnalytics/ReportsAnalytics";
import Orders from "./Pages/Orders/Orders";
import CustomerManage from "./Pages/CustomerManage/CustomerManage";
import RouteManagement from "./Pages/RouteManagement/RouteManagement";
import Inventory from "./Pages/Inventory/Inventory";
import Vehicles from "./Components/Vehicles/Vehicles";
import AddExpense from "./Components/AddExpense/AddExpense";
import SubscriptionManagement from "./Pages/SubscriptionManagement/SubscriptionManagement";
import DeliveryId from "./Pages/DeliveryId/DeliveryId";
import ManageStock from "./Components/ManageStock/ManageStock";
import StockManagement from "./Components/StockManagement/StockManagement";
import LeaveRequest from "./Components/LeaveRequest/LeaveRequest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Redirect */}
            <Route
              path="/"
              element={<Navigate to="/wdms/dashboard" replace />}
            />

            {/* Main Pages */}
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/shop" element={<ShopPosting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-posting" element={<BlogPosting />} />
            <Route
              path="/blog-management"
              element={<BlogManagement />}
            />

            {/* WDMS */}
            <Route
              path="/wdms/dashboard"
              element={<DashboardMain />}
            />
            <Route path="/wdms/orders" element={<Orders />} />
            <Route
              path="/wdms/customer"
              element={<CustomerManage />}
            />
            <Route
              path="/wdms/route-management"
              element={<RouteManagement />}
            />
            <Route
              path="/wdms/inventory"
              element={<Inventory />}
            />
            <Route
              path="/wdms/expenses"
              element={<Expense />}
            />
            <Route
              path="/wdms/add-expenses"
              element={<AddExpense />}
            />
            <Route
              path="/wdms/reports"
              element={<ReportsAnalytics />}
            />
            <Route
              path="/wdms/stock/manage"
              element={<ManageStock />}
            />
            <Route
              path="/wdms/stock/purchase-history"
              element={<StockManagement />}
            />
            <Route
              path="/wdms/payments"
              element={<Paymentmanagement />}
            />
            <Route
              path="/wdms/products-pricing"
              element={<ProductandPrice />}
            />
            <Route
              path="/wdms/assign-delivery"
              element={<DeliveryBoyassign />}
            />
            <Route
              path="/wdms/damage-stock"
              element={<DamagedStock />}
            />
            <Route
              path="/wdms/vehicles"
              element={<Vehicles />}
            />
            <Route
              path="/wdms/invoice"
              element={<InvoiceManagement />}
            />
            <Route
              path="/wdms/leave-request"
              element={<LeaveRequest />}
            />

            {/* Product Pages */}
            <Route
              path="/products/subscription"
              element={<SubscriptionManagement />}
            />
            <Route
              path="/products/id-generate"
              element={<DeliveryId />}
            />
            <Route
              path="/products/testimonials"
              element={<Testimonial />}
            />

            {/* Resource Pages */}
            <Route
              path="/resources/team"
              element={<OurTeam />}
            />
            <Route
              path="/resources/gallery"
              element={<Gallery />}
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