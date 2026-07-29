import React, { useState } from 'react';
import { 
  Users, Clock, CheckCircle2, XCircle, UserCheck, BellRing, 
  Search, Calendar, RotateCcw, Filter, FileSpreadsheet, Printer, 
  Eye, Check, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import './LeaveRequest.css';

const initialData = [
  {
    id: 1,
    name: 'Rakesh Kumar',
    hub: 'Bhubaneswar Hub',
    empId: 'DLV1023',
    leaveType: 'Sick Leave',
    leaveBadgeClass: 'badge-sick',
    fromTo: '28 Jul - 30 Jul 2026',
    fromDate: '2026-07-28',
    toDate: '2026-07-30',
    days: 3,
    reason: 'Fever & Cold',
    fullReason: 'Fever & Cold. Need rest for few days.',
    appliedOn: '27 Jul 2026',
    appliedOnTime: '09:24 AM',
    status: 'Pending',
    statusBadgeClass: 'status-pending',
    mobile: '+91 9437 82 4560',
    route: 'Route - 12 (Patia Area)',
    emergency: 'No',
    docName: 'Medical_Certificate.jpg',
    docSize: '2.4 MB',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Amit Pradhan',
    hub: 'Cuttack Hub',
    empId: 'DLV1045',
    leaveType: 'Casual Leave',
    leaveBadgeClass: 'badge-casual',
    fromTo: '02 Aug - 02 Aug 2026',
    fromDate: '2026-08-02',
    toDate: '2026-08-02',
    days: 1,
    reason: 'Family Function',
    fullReason: 'Attending sister marriage function.',
    appliedOn: '27 Jul 2026',
    appliedOnTime: '07:10 PM',
    status: 'Approved',
    statusBadgeClass: 'status-approved',
    mobile: '+91 9876 54 3210',
    route: 'Route - 05 (Badambadi)',
    emergency: 'No',
    docName: '',
    docSize: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Rohit Das',
    hub: 'Puri Hub',
    empId: 'DLV1078',
    leaveType: 'Emergency',
    leaveBadgeClass: 'badge-emergency',
    fromTo: '29 Jul - 31 Jul 2026',
    fromDate: '2026-07-29',
    toDate: '2026-07-31',
    days: 3,
    reason: 'Medical Emergency',
    fullReason: 'Sudden hospital admission for family member.',
    appliedOn: '27 Jul 2026',
    appliedOnTime: '04:30 PM',
    status: 'Pending',
    statusBadgeClass: 'status-pending',
    mobile: '+91 9123 45 6789',
    route: 'Route - 02 (Grand Road)',
    emergency: 'Yes',
    docName: 'Hospital_Slip.pdf',
    docSize: '1.8 MB',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Sandeep Singh',
    hub: 'Bhubaneswar Hub',
    empId: 'DLV1090',
    leaveType: 'Casual Leave',
    leaveBadgeClass: 'badge-casual',
    fromTo: '05 Aug - 06 Aug 2026',
    fromDate: '2026-08-05',
    toDate: '2026-08-06',
    days: 2,
    reason: 'Personal work',
    fullReason: 'Personal work at bank.',
    appliedOn: '26 Jul 2026',
    appliedOnTime: '11:20 AM',
    status: 'Approved',
    statusBadgeClass: 'status-approved',
    mobile: '+91 9988 77 6655',
    route: 'Route - 08 (Khandagiri)',
    emergency: 'No',
    docName: '',
    docSize: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Manas Behera',
    hub: 'Khordha Hub',
    empId: 'DLV1102',
    leaveType: 'Earned Leave',
    leaveBadgeClass: 'badge-earned',
    fromTo: '01 Aug - 04 Aug 2026',
    fromDate: '2026-08-01',
    toDate: '2026-08-04',
    days: 4,
    reason: 'Holiday',
    fullReason: 'Going for annual family vacation.',
    appliedOn: '26 Jul 2026',
    appliedOnTime: '10:10 AM',
    status: 'Pending',
    statusBadgeClass: 'status-pending',
    mobile: '+91 9337 11 2233',
    route: 'Route - 01 (Khordha Town)',
    emergency: 'No',
    docName: '',
    docSize: '',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Rahul Sahu',
    hub: 'Cuttack Hub',
    empId: 'DLV1115',
    leaveType: 'Sick Leave',
    leaveBadgeClass: 'badge-sick',
    fromTo: '28 Jul - 29 Jul 2026',
    fromDate: '2026-07-28',
    toDate: '2026-07-29',
    days: 2,
    reason: 'Headache',
    fullReason: 'Severe migraine headache.',
    appliedOn: '25 Jul 2026',
    appliedOnTime: '09:15 PM',
    status: 'Rejected',
    statusBadgeClass: 'status-rejected',
    mobile: '+91 9445 66 7788',
    route: 'Route - 03 (Link Road)',
    emergency: 'No',
    docName: '',
    docSize: '',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    name: 'Bikash Roul',
    hub: 'Bhubaneswar Hub',
    empId: 'DLV1120',
    leaveType: 'Casual Leave',
    leaveBadgeClass: 'badge-casual',
    fromTo: '07 Aug - 07 Aug 2026',
    fromDate: '2026-08-07',
    toDate: '2026-08-07',
    days: 1,
    reason: 'Temple Visit',
    fullReason: 'Visiting temple with family.',
    appliedOn: '25 Jul 2026',
    appliedOnTime: '03:40 PM',
    status: 'Approved',
    statusBadgeClass: 'status-approved',
    mobile: '+91 9771 22 3344',
    route: 'Route - 10 (Old Town)',
    emergency: 'No',
    docName: '',
    docSize: '',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    name: 'Subham Nayak',
    hub: 'Puri Hub',
    empId: 'DLV1133',
    leaveType: 'Casual Leave',
    leaveBadgeClass: 'badge-casual',
    fromTo: '10 Aug - 12 Aug 2026',
    fromDate: '2026-08-10',
    toDate: '2026-08-12',
    days: 3,
    reason: 'Personal',
    fullReason: 'Personal work at hometown.',
    appliedOn: '24 Jul 2026',
    appliedOnTime: '06:20 PM',
    status: 'Pending',
    statusBadgeClass: 'status-pending',
    mobile: '+91 9112 33 4455',
    route: 'Route - 04 (Sea Beach Area)',
    emergency: 'No',
    docName: '',
    docSize: '',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
  }
];

const LeaveRequest = () => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(initialData[0]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLeaveType, setFilterLeaveType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterHub, setFilterHub] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Handle Tab Change
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Row selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Open Details Card
  const handleViewDetails = (item) => {
    setSelectedRequest(item);
    setIsDetailsOpen(true);
  };

  // Update Item Status Directly via Action Row Buttons
  const handleStatusUpdate = (id, newStatus) => {
    const updated = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          statusBadgeClass: newStatus === 'Approved' ? 'status-approved' : 'status-rejected'
        };
      }
      return item;
    });
    setData(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({
        ...selectedRequest,
        status: newStatus,
        statusBadgeClass: newStatus === 'Approved' ? 'status-approved' : 'status-rejected'
      });
    }
  };

  // Working Export Functionality
  const handleExportCSV = () => {
    const headers = ["Employee ID", "Name", "Hub", "Leave Type", "From - To", "Days", "Reason", "Status", "Applied On"];
    const rows = filteredData.map(item => [
      item.empId,
      `"${item.name}"`,
      `"${item.hub}"`,
      item.leaveType,
      `"${item.fromTo}"`,
      item.days,
      `"${item.reason}"`,
      item.status,
      `"${item.appliedOn} ${item.appliedOnTime}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Leave_Requests_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Working Print Functionality
  const handlePrintReport = () => {
    window.print();
  };

  // Filter logic
  const filteredData = data.filter(item => {
    const matchesTab = activeTab === 'All' || item.status === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.mobile.includes(searchQuery);
    const matchesType = filterLeaveType === 'All' || item.leaveType === filterLeaveType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesHub = filterHub === 'All' || item.hub.includes(filterHub);
    const matchesFromDate = !fromDate || item.fromDate >= fromDate;
    const matchesToDate = !toDate || item.toDate <= toDate;

    return matchesTab && matchesSearch && matchesType && matchesStatus && matchesHub && matchesFromDate && matchesToDate;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterLeaveType('All');
    setFilterStatus('All');
    setFilterHub('All');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="lr-page-wrapper">
      
      {/* Main Content Body */}
      <div className={`lr-main-content ${isDetailsOpen ? 'with-sidebar' : ''}`}>
        
        {/* Breadcrumb & Header */}
        <div className="lr-top-nav">
          <div className="lr-breadcrumb">
            Dashboard <span>&gt;</span> HR Management <span>&gt;</span> <strong>Leave Requests</strong>
          </div>
          <div className="lr-current-date-badge">
            <Calendar size={14} /> Mon, 28 Jul 2026
          </div>
        </div>

        <div className="lr-page-header">
          <div>
            <h1 className="lr-page-title">
              <span className="lr-title-logo">💧</span> Leave Requests
            </h1>
            <p className="lr-page-subtitle">Manage and approve leave requests from delivery partners</p>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="lr-stats-grid">
          <div className="lr-stat-card card-total">
            <div className="stat-icon-wrap icon-blue">
              <Users size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Requests</span>
              <h3 className="stat-value">48</h3>
              <span className="stat-sub">This Month</span>
            </div>
          </div>

          <div className="lr-stat-card card-pending">
            <div className="stat-icon-wrap icon-orange">
              <Clock size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Pending</span>
              <h3 className="stat-value">12</h3>
              <span className="stat-sub">Awaiting Approval</span>
            </div>
          </div>

          <div className="lr-stat-card card-approved">
            <div className="stat-icon-wrap icon-green">
              <CheckCircle2 size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Approved</span>
              <h3 className="stat-value">28</h3>
              <span className="stat-sub">This Month</span>
            </div>
          </div>

          <div className="lr-stat-card card-rejected">
            <div className="stat-icon-wrap icon-red">
              <XCircle size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Rejected</span>
              <h3 className="stat-value">5</h3>
              <span className="stat-sub">This Month</span>
            </div>
          </div>

          <div className="lr-stat-card card-onleave">
            <div className="stat-icon-wrap icon-purple">
              <UserCheck size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label">On Leave Today</span>
              <h3 className="stat-value">18</h3>
              <span className="stat-sub">Employees</span>
            </div>
          </div>

          <div className="lr-stat-card card-emergency">
            <div className="stat-icon-wrap icon-cyan">
              <BellRing size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Emergency Leave</span>
              <h3 className="stat-value">4</h3>
              <span className="stat-sub">This Month</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="lr-filter-card">
          <div className="filter-item filter-search">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, ID or mobile..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Leave Type</label>
            <select value={filterLeaveType} onChange={(e) => setFilterLeaveType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Delivery Hub</label>
            <select value={filterHub} onChange={(e) => setFilterHub(e.target.value)}>
              <option value="All">All Hubs</option>
              <option value="Bhubaneswar">Bhubaneswar Hub</option>
              <option value="Cuttack">Cuttack Hub</option>
              <option value="Puri">Puri Hub</option>
              <option value="Khordha">Khordha Hub</option>
            </select>
          </div>

          {/* Working Date Picker Calendar Inputs */}
          <div className="filter-item date-picker-item">
            <label>From</label>
            <div className="date-input-wrap">
              <input 
                type="date" 
                value={fromDate} 
                onChange={(e) => setFromDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="filter-item date-picker-item">
            <label>To</label>
            <div className="date-input-wrap">
              <input 
                type="date" 
                value={toDate} 
                onChange={(e) => setToDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-reset" onClick={handleResetFilters}>
              <RotateCcw size={14} /> Reset
            </button>
            <button className="btn-filter">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Action Bar + Tabs */}
        <div className="lr-table-toolbar">
          <div className="lr-tabs">
            <button 
              className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
              onClick={() => handleTabClick('All')}
            >
              All Requests (48)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Pending' ? 'active' : ''}`}
              onClick={() => handleTabClick('Pending')}
            >
              Pending (12)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Approved' ? 'active' : ''}`}
              onClick={() => handleTabClick('Approved')}
            >
              Approved (28)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Rejected' ? 'active' : ''}`}
              onClick={() => handleTabClick('Rejected')}
            >
              Rejected (5)
            </button>
          </div>

          <div className="toolbar-export-btns">
            <button className="btn-export" onClick={handleExportCSV}>
              <FileSpreadsheet size={15} color="#16a34a" /> Export Excel
            </button>
            <button className="btn-export" onClick={handlePrintReport}>
              <Printer size={15} /> Print Report
            </button>
          </div>
        </div>

        {/* Main Requests Table */}
        <div className="lr-table-card">
          <div className="table-responsive">
            <table className="lr-table">
              <thead>
                <tr>
                  <th width="40">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedRows.length === data.length && data.length > 0} 
                    />
                  </th>
                  <th width="40">#</th>
                  <th>Delivery Partner</th>
                  <th>Employee ID</th>
                  <th>Leave Type</th>
                  <th>From - To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`${selectedRows.includes(row.id) ? 'row-selected' : ''} ${selectedRequest?.id === row.id && isDetailsOpen ? 'row-active' : ''}`}
                  >
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <div className="partner-cell">
                        <img src={row.avatar} alt={row.name} className="partner-avatar" />
                        <div>
                          <span className="partner-name">{row.name}</span>
                          <span className="partner-hub">{row.hub}</span>
                        </div>
                      </div>
                    </td>
                    <td className="emp-id-cell">{row.empId}</td>
                    <td>
                      <span className={`badge-leave ${row.leaveBadgeClass}`}>
                        {row.leaveType}
                      </span>
                    </td>
                    <td className="date-cell">{row.fromTo}</td>
                    <td className="days-cell">{row.days}</td>
                    <td className="reason-cell" title={row.reason}>{row.reason}</td>
                    <td>
                      <div className="applied-cell">
                        <span>{row.appliedOn}</span>
                        <small>{row.appliedOnTime}</small>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-status ${row.statusBadgeClass}`}>
                        ● {row.status}
                      </span>
                    </td>
                    <td>
                      {/* Prominent Action Buttons with Large Icons */}
                      <div className="action-buttons">
                        <button 
                          className="btn-action btn-view" 
                          title="View Details"
                          onClick={() => handleViewDetails(row)}
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="btn-action btn-approve" 
                          title="Approve Leave"
                          onClick={() => handleStatusUpdate(row.id, 'Approved')}
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          className="btn-action btn-reject" 
                          title="Reject Leave"
                          onClick={() => handleStatusUpdate(row.id, 'Rejected')}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Bulk Actions */}
          <div className="lr-table-footer">
            <div className="footer-left">
              <span className="results-count">Showing 1 – {filteredData.length} of {data.length} requests</span>
              <button className="btn-selected-count">
                Show selected ({selectedRows.length})
              </button>
              <button className="btn-bulk btn-bulk-approve">
                Approve Selected
              </button>
              <button className="btn-bulk btn-bulk-reject">
                Reject Selected
              </button>
              <button className="btn-bulk btn-bulk-hold">
                Mark As Hold
              </button>
            </div>

            <div className="footer-right">
              <div className="pagination">
                <button className="page-nav" disabled><ChevronLeft size={14} /></button>
                <button className="page-num active">1</button>
                <button className="page-num">2</button>
                <button className="page-num">3</button>
                <button className="page-num">4</button>
                <button className="page-num">5</button>
                <span className="page-dots">...</span>
                <button className="page-num">6</button>
                <button className="page-nav"><ChevronRight size={14} /></button>
              </div>

              <div className="rows-per-page">
                <span>Rows per page:</span>
                <select defaultValue="8">
                  <option value="8">8</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Analytics Section */}
        <div className="lr-analytics-grid">
          
          {/* Monthly Trend Chart Simulation */}
          <div className="analytics-card">
            <h4 className="analytics-title">Monthly Leave Trend</h4>
            <div className="chart-placeholder">
              <div className="chart-tooltip-sim">
                <span>Jul 2026</span>
                <strong>48 Requests</strong>
              </div>
              <svg viewBox="0 0 500 100" className="trend-svg">
                <path 
                  d="M0,80 Q50,70 100,85 T200,60 T300,30 T400,65 T500,90" 
                  fill="none" 
                  stroke="#0284c7" 
                  strokeWidth="2" 
                />
                <circle cx="300" cy="30" r="4" fill="#0284c7" />
              </svg>
              <div className="chart-x-axis">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Simulation */}
          <div className="analytics-card">
            <h4 className="analytics-title">Leave Type Distribution</h4>
            <div className="donut-flex">
              <div className="donut-chart-sim">
                <div className="donut-hole"></div>
              </div>
              <div className="donut-legend">
                <div><span className="legend-dot dot-casual"></span> Casual Leave <strong>45%</strong></div>
                <div><span className="legend-dot dot-sick"></span> Sick Leave <strong>28%</strong></div>
                <div><span className="legend-dot dot-earned"></span> Earned Leave <strong>15%</strong></div>
                <div><span className="legend-dot dot-emergency"></span> Emergency <strong>12%</strong></div>
              </div>
            </div>
          </div>

          {/* Top Reasons Progress Bars */}
          <div className="analytics-card">
            <h4 className="analytics-title">Top Leave Reasons</h4>
            <div className="reasons-list">
              <div className="reason-item">
                <div className="reason-label">
                  <span>Personal Work</span> <strong>40%</strong>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '40%' }}></div></div>
              </div>

              <div className="reason-item">
                <div className="reason-label">
                  <span>Medical</span> <strong>28%</strong>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '28%' }}></div></div>
              </div>

              <div className="reason-item">
                <div className="reason-label">
                  <span>Family Function</span> <strong>18%</strong>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '18%' }}></div></div>
              </div>

              <div className="reason-item">
                <div className="reason-label">
                  <span>Other</span> <strong>14%</strong>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '14%' }}></div></div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="lr-page-footer">
          <span>© 2026 Alka Drops. All rights reserved.</span>
          <span className="footer-tagline">💧 Delivering Purity, Ensuring Wellness</span>
        </footer>

      </div>

      {/* Right Details Panel Sidebar */}
      {isDetailsOpen && selectedRequest && (
        <aside className="lr-details-sidebar">
          <div className="sidebar-header">
            <h3>Leave Request Details</h3>
            <button className="btn-close-sidebar" onClick={() => setIsDetailsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="sidebar-content">
            
            {/* User Profile Card */}
            <div className="user-profile-box">
              <img src={selectedRequest.avatar} alt={selectedRequest.name} className="user-avatar-lg" />
              <div className="user-main-info">
                <div className="user-name-status">
                  <h4>{selectedRequest.name}</h4>
                  <span className="status-active-badge">● Active</span>
                </div>
                <p className="user-role">Delivery Partner</p>
                <div className="user-meta-list">
                  <div><span>Employee ID</span> <strong>{selectedRequest.empId}</strong></div>
                  <div><span>Hub</span> <strong>{selectedRequest.hub}</strong></div>
                  <div><span>Mobile</span> <strong>{selectedRequest.mobile}</strong></div>
                  <div><span>Route</span> <strong>{selectedRequest.route}</strong></div>
                </div>
              </div>
            </div>

            {/* Leave Information Box */}
            <div className="info-block">
              <h5 className="block-title"><Calendar size={14} /> Leave Information</h5>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-key">Leave Type</span>
                  <span className="info-val">: <span className={`badge-leave ${selectedRequest.leaveBadgeClass}`}>{selectedRequest.leaveType}</span></span>
                </div>
                <div className="info-row">
                  <span className="info-key">From Date</span>
                  <span className="info-val">: <strong>{selectedRequest.fromDate}</strong></span>
                </div>
                <div className="info-row">
                  <span className="info-key">To Date</span>
                  <span className="info-val">: <strong>{selectedRequest.toDate}</strong></span>
                </div>
                <div className="info-row">
                  <span className="info-key">Total Days</span>
                  <span className="info-val">: <strong>{selectedRequest.days} Days</strong></span>
                </div>
                <div className="info-row">
                  <span className="info-key">Applied On</span>
                  <span className="info-val">: {selectedRequest.appliedOn}, {selectedRequest.appliedOnTime}</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Reason</span>
                  <span className="info-val">: {selectedRequest.fullReason}</span>
                </div>
                <div className="info-row" style={{ marginTop: '6px' }}>
                  <span className="info-key">Emergency :</span>
                  <span className="info-val"><strong>{selectedRequest.emergency}</strong></span>
                </div>
              </div>
            </div>

            {/* Supporting Document Box */}
            {selectedRequest.docName && (
              <div className="info-block">
                <h5 className="block-title">📎 Supporting Document</h5>
                <div className="doc-attachment-card">
                  <div className="doc-icon">📄</div>
                  <div className="doc-info">
                    <p className="doc-name">{selectedRequest.docName}</p>
                    <span className="doc-size">{selectedRequest.docSize}</span>
                  </div>
                  <button className="btn-view-doc">View</button>
                </div>
              </div>
            )}

            {/* Leave Balance Box */}
            <div className="info-block">
              <h5 className="block-title"><Calendar size={14} /> Leave Balance</h5>
              <div className="balance-list">
                <div className="balance-item">
                  <span>Casual Leave</span>
                  <strong>06 / 12 Days</strong>
                </div>
                <div className="balance-item">
                  <span>Sick Leave</span>
                  <strong>03 / 8 Days</strong>
                </div>
                <div className="balance-item">
                  <span>Earned Leave</span>
                  <strong>04 / 10 Days</strong>
                </div>
              </div>
            </div>

            {/* Admin Action Form */}
            <div className="info-block admin-action-block">
              <h5 className="block-title">👤 Admin Action</h5>
              
              <div className="action-toggle-row">
                <button 
                  className={`btn-toggle-action btn-toggle-approve ${selectedRequest.status === 'Approved' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedRequest.id, 'Approved')}
                >
                  ✓ Approve
                </button>
                <button 
                  className={`btn-toggle-action btn-toggle-reject ${selectedRequest.status === 'Rejected' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedRequest.id, 'Rejected')}
                >
                  ✕ Reject
                </button>
              </div>

              <div className="request-more-option">
                <input type="radio" id="moreInfo" name="adminOpt" />
                <label htmlFor="moreInfo">Request More Info</label>
              </div>

              <div className="notes-area">
                <label>Admin Notes (Optional)</label>
                <textarea placeholder="Add notes about this request..." rows={2}></textarea>
              </div>

              <div className="notify-checkbox">
                <input type="checkbox" id="notify" defaultChecked />
                <label htmlFor="notify">Notify employee about decision</label>
              </div>

              <div className="sidebar-action-btns">
                <button className="btn-side-cancel" onClick={() => setIsDetailsOpen(false)}>
                  Cancel
                </button>
                <button className="btn-side-submit" onClick={() => handleStatusUpdate(selectedRequest.id, 'Approved')}>
                  ✓ Approve Leave
                </button>
              </div>
            </div>

          </div>
        </aside>
      )}

    </div>
  );
};

export default LeaveRequest;