import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import './DeliveryBoyassign.css';

const DeliveryBoyassign = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Total');
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState([]); // Route Assignment records from /routeRoutes/assignments

  const [metrics, setMetrics] = useState({
    totalCount: 0,
    activeCount: 0,
    onDeliveryCount: 0,
    inactiveCount: 0,
    assignedCount: 0,
    unassignedCount: 0
  });

  // --- Helper: find the MOST RECENT route assigned to a delivery boy by name ---
  // A driver can appear in multiple saved route-assignment records over time
  // (one per date/order), so sort newest-first and take the first match.
  const getAssignedRoute = (boyName, routes = routeData) => {
    if (!boyName) return null;
    const matches = routes
      .filter((item) => item.name?.toLowerCase() === boyName.toLowerCase())
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return matches[0] || null;
  };

  // Calculate dynamic count summary
  const calculateMetrics = (list, routes = routeData) => {
    const totalCount = list.length;
    const activeCount = list.filter((b) => b.status === 'Active').length;
    const onDeliveryCount = list.filter((b) => b.status === 'On-Delivery').length;
    const inactiveCount = list.filter((b) => b.status === 'Inactive').length;

    const assignedNames = new Set(routes.map((route) => route.name?.toLowerCase()));
    const assignedCount = list.filter((b) => assignedNames.has(b.name?.toLowerCase())).length;
    const unassignedCount = totalCount - assignedCount;

    setMetrics({
      totalCount,
      activeCount,
      onDeliveryCount,
      inactiveCount,
      assignedCount,
      unassignedCount
    });
  };

  // --- Fetch registered delivery partners from /delivery ---
  const fetchDeliveryBoys = async (routes = routeData) => {
    setLoading(true);
    try {
      const response = await API.get('/delivery');
      if (response.data?.success) {
        const rawPartners = response.data.data || [];

        const mappedPartners = rawPartners.map((boy) => ({
          _id: boy._id,
          name: boy.name || 'Unnamed',
          mobile: boy.phone || boy.mobile || 'N/A',
          vehicle: boy.vehicle || 'N/A',
          orders: Number.isFinite(boy.orders) ? boy.orders : (Number(boy.orders) || 0),
          status: boy.status || 'Active'
        }));

        setData(mappedPartners);
        calculateMetrics(mappedPartners, routes);
      }
    } catch (error) {
      console.error('Error fetching delivery boys:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch Route Assignment records ---
  // IMPORTANT: RouteManagement now persists its "Add New Entry" submissions to
  // /api/routeRoutes/assignments (see RouteManagement.jsx's API_BASE_URL), NOT
  // /api/root. This must point at the same place or route data will never
  // show up here.
  const fetchRouteData = async () => {
    try {
      const response = await API.get('/routeRoutes/assignments');
      if (response.data?.success && Array.isArray(response.data.data)) {
        const routes = response.data.data.map((item) => ({
          _id: item._id,
          date: item.date,
          name: item.name,
          order: item.order,
          locations: Array.isArray(item.locations) ? item.locations : [],
          vehicleNo: item.vehicleNo,
          vehicle: item.vehicle
        }));
        setRouteData(routes);
        return routes;
      }
      setRouteData([]);
      return [];
    } catch (error) {
      console.error('Route fetch error:', error);
      setRouteData([]);
      return [];
    }
  };

  // Load both data sets together on mount so metrics/table render with
  // correct assigned/unassigned counts on the very first paint.
  useEffect(() => {
    const loadAll = async () => {
      const routes = await fetchRouteData();
      await fetchDeliveryBoys(routes);
    };
    loadAll();
  }, []);

  // Filter list based on selected filter button
  const filteredData = data.filter((boy) => {
    if (filter === 'All') return true;
    if (filter === 'Assigned') {
      return Boolean(getAssignedRoute(boy.name));
    }
    if (filter === 'Unassigned') {
      return !getAssignedRoute(boy.name);
    }
    return boy.status === filter;
  });

  const handleFilterClick = (status, filterName) => {
    setFilter(status);
    setActiveFilter(filterName);
  };

  // Handle Status Change (Optimistic UI update + API call)
  const handleStatusChange = async (id, newStatus) => {
    const updatedData = data.map((boy) =>
      boy._id === id ? { ...boy, status: newStatus } : boy
    );
    setData(updatedData);
    calculateMetrics(updatedData);

    try {
      const res = await API.put(`/delivery/${id}`, { status: newStatus });
      if (!res.data?.success) {
        fetchDeliveryBoys();
      }
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status on server.');
      fetchDeliveryBoys(); // Revert to server state on error
    }
  };

  // Delete Delivery Partner
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this delivery partner?')) return;
    try {
      const res = await API.delete(`/delivery/${id}`);
      if (res.data?.success) {
        fetchDeliveryBoys();
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
      alert('Failed to delete delivery partner');
    }
  };

  const getStatusColorClass = (status) => {
    if (status === 'Active') return 'status-active';
    if (status === 'On-Delivery') return 'status-ondelivery';
    if (status === 'Inactive') return 'status-inactive';
    return '';
  };

  // Export Filtered Table to CSV
  const handleDownload = () => {
    if (filteredData.length === 0) {
      alert('No data available to download!');
      return;
    }

    const headers = ['Delivery Boy', 'Mobile', 'Vehicle', "Today's Orders", 'Assigned Route (Order / Location / Vehicle No.)', 'Status'];
    const rows = filteredData.map((boy) => {
      const route = getAssignedRoute(boy.name);
      const routeSummary = route
        ? `${route.order || 'N/A'} | ${route.locations.join(', ') || 'N/A'} | ${route.vehicleNo || 'N/A'}`
        : 'Unassigned';
      return [
        boy.name,
        boy.mobile,
        route?.vehicle || boy.vehicle,
        route?.order || boy.orders,
        routeSummary,
        boy.status
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', `Delivery_Boy_Report_${filter}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="db-management-container">
      <div className="db-management-panel">
        <div className="db-header">
          <h2 className="header-text">DELIVERY BOY MANAGEMENT</h2>
          <button className="download-btn" onClick={handleDownload}>
            Download CSV
          </button>
        </div>

        {/* Dynamic Metric Display */}
        <div className="db-metrics-container">
          <div
            className={`metric-box ${activeFilter === 'Total' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('All', 'Total')}
          >
            <p className="metric-title">Total Delivery Boys</p>
            <span className="num-display total-num">{metrics.totalCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Active' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Active', 'Active')}
          >
            <p className="metric-title">On-Duty</p>
            <span className="num-display active-num">{metrics.activeCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'OnDelivery' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('On-Delivery', 'OnDelivery')}
          >
            <p className="metric-title">On-Delivery</p>
            <span className="num-display ondelivery-num">{metrics.onDeliveryCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Inactive' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Inactive', 'Inactive')}
          >
            <p className="metric-title">Inactive</p>
            <span className="num-display inactive-num">{metrics.inactiveCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Assigned' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Assigned', 'Assigned')}
          >
            <p className="metric-title">Assigned to Routes</p>
            <span className="num-display total-num" style={{ color: '#10b981' }}>{metrics.assignedCount}</span>
          </div>
          <div
            className={`metric-box ${activeFilter === 'Unassigned' ? 'active-metric' : ''}`}
            onClick={() => handleFilterClick('Unassigned', 'Unassigned')}
          >
            <p className="metric-title">Unassigned</p>
            <span className="num-display total-num" style={{ color: '#f59e0b' }}>{metrics.unassignedCount}</span>
          </div>
        </div>

        {/* Table View */}
        <div className="db-table-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading data...</div>
          ) : (
            <table className="db-table">
              <thead>
                <tr>
                  <th>Delivery Boy</th>
                  <th>Mobile</th>
                  <th>Vehicle</th>
                  <th>Today's Orders</th>
                  <th>Assigned Route</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((boy) => {
                  const assignedRoute = getAssignedRoute(boy.name);

                  return (
                    <tr key={boy._id}>
                      <td data-label="Delivery Boy" className="td-name">{boy.name}</td>
                      <td data-label="Mobile" className="td-mobile">{boy.mobile}</td>

                      {/* Vehicle — the vehicle currently assigned to this driver's
                          active route if there is one, otherwise their own vehicle */}
                      <td data-label="Vehicle">
                        {assignedRoute?.vehicle || boy.vehicle}
                      </td>

                      {/* Today's Orders — the order tied to the active route
                          assignment if there is one, otherwise their own order count */}
                      <td data-label="Today's Orders">
                        {assignedRoute?.order || boy.orders}
                      </td>

                      {/* Assigned Route — Order / Location(s) / Vehicle No. pulled
                          straight from the route assignment record */}
                      <td data-label="Assigned Route">
                        {assignedRoute ? (
                          <div className="assigned-route-cell">
                            <span className="route-badge">
                              {assignedRoute.order || 'Route Assigned'}
                            </span>
                            <br />
                            <small>
                              Location: {assignedRoute.locations.length > 0 ? assignedRoute.locations.join(', ') : 'N/A'}
                            </small>
                            <br />
                            <small>
                              Vehicle No.: {assignedRoute.vehicleNo || 'N/A'}
                            </small>
                          </div>
                        ) : (
                          <span className="route-badge" style={{ opacity: 0.6 }}>
                            Not Assigned
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td data-label="Status">
                        <span className={`status-badge-visual ${getStatusColorClass(boy.status)}`}>
                          {boy.status}
                        </span>
                      </td>

                      <td data-label="Action" className="td-actions">
                        <div className={`action-dropdown-wrapper ${getStatusColorClass(boy.status)}-text`}>
                          <span className="dropdown-dot"></span>
                          <select
                            value={boy.status}
                            onChange={(e) => handleStatusChange(boy._id, e.target.value)}
                            className="action-select"
                          >
                            <option value="Active">Active</option>
                            <option value="On-Delivery">On-Delivery</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <button
                          onClick={() => handleDelete(boy._id)}
                          style={{ marginLeft: '10px', color: 'red', cursor: 'pointer', border: 'none', background: 'transparent' }}
                          title="Delete record"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!loading && filteredData.length === 0 && (
            <div className="no-results-box">
              <p className="no-results-text">No delivery personnel found matching this filter view.</p>
            </div>
          )}
        </div>

        <div className="db-footer-action">
          <button className="view-all-btn" onClick={() => handleFilterClick('All', 'Total')}>
            View All Delivery Boys
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyassign;