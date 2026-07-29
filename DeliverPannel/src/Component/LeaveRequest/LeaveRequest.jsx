import React, { useState } from 'react';
import { 
  Users, Clock, CheckCircle2, XCircle, Search, RotateCcw, 
  Calendar, Download, Eye, ChevronLeft, ChevronRight, ArrowRight 
} from 'lucide-react';
import './LeaveRequest.css';

const initialRequests = [
  {
    id: 'DL001',
    name: 'Santanu Ranjan Bal',
    phone: '+91 99377 2458',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Sick Leave',
    leaveTypeClass: 'lr-type-sick',
    from: '25 Jul 2026',
    to: '27 Jul 2026',
    days: 3,
    reason: 'High fever and doctor advised...',
    appliedOnDate: '24 Jul 2026',
    appliedOnTime: '10:30 AM',
    status: 'Pending',
    statusClass: 'lr-status-pending',
    branch: 'Bhubaneswar'
  },
  {
    id: 'DL005',
    name: 'Rahul Das',
    phone: '+91 78560 2147',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Casual Leave',
    leaveTypeClass: 'lr-type-casual',
    from: '20 Jul 2026',
    to: '20 Jul 2026',
    days: 1,
    reason: 'Personal work',
    appliedOnDate: '19 Jul 2026',
    appliedOnTime: '09:15 AM',
    status: 'Approved',
    statusClass: 'lr-status-approved',
    branch: 'Cuttack'
  },
  {
    id: 'DL008',
    name: 'Amit Kumar',
    phone: '+91 97766 8891',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Emergency Leave',
    leaveTypeClass: 'lr-type-emergency',
    from: '18 Jul 2026',
    to: '19 Jul 2026',
    days: 2,
    reason: 'Family emergency',
    appliedOnDate: '17 Jul 2026',
    appliedOnTime: '04:45 PM',
    status: 'Rejected',
    statusClass: 'lr-status-rejected',
    branch: 'Puri'
  },
  {
    id: 'DL011',
    name: 'Suresh Nayak',
    phone: '+91 89841 2233',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Casual Leave',
    leaveTypeClass: 'lr-type-casual',
    from: '15 Jul 2026',
    to: '15 Jul 2026',
    days: 1,
    reason: 'Going to hometown',
    appliedOnDate: '14 Jul 2026',
    appliedOnTime: '11:20 AM',
    status: 'Approved',
    statusClass: 'lr-status-approved',
    branch: 'Cuttack'
  },
  {
    id: 'DL014',
    name: 'Bikash Behera',
    phone: '+91 91245 6677',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Sick Leave',
    leaveTypeClass: 'lr-type-sick',
    from: '12 Jul 2026',
    to: '14 Jul 2026',
    days: 3,
    reason: 'Viral infection',
    appliedOnDate: '12 Jul 2026',
    appliedOnTime: '08:10 AM',
    status: 'Pending',
    statusClass: 'lr-status-pending',
    branch: 'Bhubaneswar'
  }
];

const LeaveRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveType, setLeaveType] = useState('All');
  const [status, setStatus] = useState('All');
  const [branch, setBranch] = useState('All');
  const [dateRange, setDateRange] = useState('01/07/2026 - 31/07/2026');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredRequests = initialRequests.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLeaveType = leaveType === 'All' || req.leaveType === leaveType;
    const matchesStatus = status === 'All' || req.status === status;
    const matchesBranch = branch === 'All' || req.branch === branch;

    return matchesSearch && matchesLeaveType && matchesStatus && matchesBranch;
  });

  const handleReset = () => {
    setSearchTerm('');
    setLeaveType('All');
    setStatus('All');
    setBranch('All');
    setDateRange('01/07/2026 - 31/07/2026');
  };

  const handleExport = () => {
    alert("Exporting leave request data...");
  };

  return (
    <div className="lr-root">
      <main className="lr-container">
        
        {/* Top Summary Cards */}
        <div className="lr-summary-grid">
          <div className="lr-card lr-stat-card">
            <div className="lr-stat-icon lr-icon-blue">
              <Users size={24} />
            </div>
            <div>
              <span className="lr-stat-title">Total Requests</span>
              <h2 className="lr-stat-value">42</h2>
              <span className="lr-stat-sub">View all requests</span>
            </div>
          </div>

          <div className="lr-card lr-stat-card">
            <div className="lr-stat-icon lr-icon-orange">
              <Clock size={24} />
            </div>
            <div>
              <span className="lr-stat-title">Pending</span>
              <h2 className="lr-stat-value">08</h2>
              <span className="lr-stat-sub">Awaiting approval</span>
            </div>
          </div>

          <div className="lr-card lr-stat-card">
            <div className="lr-stat-icon lr-icon-green">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <span className="lr-stat-title">Approved</span>
              <h2 className="lr-stat-value">29</h2>
              <span className="lr-stat-sub">This month</span>
            </div>
          </div>

          <div className="lr-card lr-stat-card">
            <div className="lr-stat-icon lr-icon-red">
              <XCircle size={24} />
            </div>
            <div>
              <span className="lr-stat-title">Rejected</span>
              <h2 className="lr-stat-value">05</h2>
              <span className="lr-stat-sub">This month</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Section & Right Sidebars */}
        <div className="lr-main-grid">
          
          {/* Left Side: Filter + Table */}
          <div className="lr-left-section">
            
            {/* Filter Box */}
            <div className="lr-card lr-filter-box">
              <div className="lr-filter-row">
                <div className="lr-field">
                  <label>Employee Name</label>
                  <div className="lr-input-wrap">
                    <input 
                      type="text" 
                      placeholder="Search employee..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={16} className="lr-input-icon" />
                  </div>
                </div>

                <div className="lr-field">
                  <label>Leave Type</label>
                  <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                  </select>
                </div>

                <div className="lr-field">
                  <label>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="lr-field">
                  <label>Date Range</label>
                  <div className="lr-input-wrap">
                    <Calendar size={16} className="lr-input-icon-left" />
                    <input 
                      type="text" 
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="lr-input-with-icon"
                    />
                  </div>
                </div>
              </div>

              <div className="lr-filter-row lr-filter-actions">
                <div className="lr-field lr-field-branch">
                  <label>Branch / Hub</label>
                  <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                    <option value="All">All Branches</option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Puri">Puri</option>
                  </select>
                </div>

                <div className="lr-btn-group">
                  <button className="lr-btn lr-btn-primary">
                    <Search size={16} /> Search
                  </button>
                  <button className="lr-btn lr-btn-outline" onClick={handleReset}>
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Table Box */}
            <div className="lr-card lr-table-card">
              <div className="lr-table-header">
                <h3>Leave Requests List</h3>
                <button className="lr-btn lr-btn-export" onClick={handleExport}>
                  <Download size={16} /> Export
                </button>
              </div>

              <div className="lr-table-wrapper">
                <table className="lr-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Employee ID</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Applied On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((row, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="lr-emp-cell">
                              <img src={row.avatar} alt={row.name} className="lr-emp-avatar" />
                              <div>
                                <p className="lr-emp-name">{row.name}</p>
                                <p className="lr-emp-phone">{row.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="lr-text-muted">{row.id}</td>
                          <td>
                            <span className={`lr-badge ${row.leaveTypeClass}`}>
                              {row.leaveType}
                            </span>
                          </td>
                          <td className="lr-text-dark">{row.from}</td>
                          <td className="lr-text-dark">{row.to}</td>
                          <td className="lr-text-dark">{row.days}</td>
                          <td className="lr-reason-cell" title={row.reason}>{row.reason}</td>
                          <td>
                            <p className="lr-date-main">{row.appliedOnDate}</p>
                            <p className="lr-date-sub">{row.appliedOnTime}</p>
                          </td>
                          <td>
                            <span className={`lr-status-badge ${row.statusClass}`}>
                              {row.status === 'Pending' && <Clock size={12} />}
                              {row.status === 'Approved' && <CheckCircle2 size={12} />}
                              {row.status === 'Rejected' && <XCircle size={12} />}
                              {row.status}
                            </span>
                          </td>
                          <td>
                            <button className="lr-action-btn">
                              <Eye size={14} /> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          No leave requests found matching criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="lr-pagination-wrap">
                <p className="lr-pagination-text">Showing 1 to 5 of 42 entries</p>
                <div className="lr-pagination-nav">
                  <button className="lr-page-btn" disabled><ChevronLeft size={16} /></button>
                  <button className={`lr-page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
                  <button className={`lr-page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
                  <button className={`lr-page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
                  <button className={`lr-page-btn ${currentPage === 4 ? 'active' : ''}`} onClick={() => setCurrentPage(4)}>4</button>
                  <button className={`lr-page-btn ${currentPage === 5 ? 'active' : ''}`} onClick={() => setCurrentPage(5)}>5</button>
                  <span className="lr-page-dots">...</span>
                  <button className="lr-page-btn" onClick={() => setCurrentPage(9)}>9</button>
                  <button className="lr-page-btn"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Section */}
          <div className="lr-right-sidebar">
            
            {/* Today's Summary Card */}
            <div className="lr-card lr-side-card">
              <div className="lr-side-head">
                <Calendar size={18} className="lr-side-head-icon" />
                <h4>Today's Summary</h4>
              </div>
              <div className="lr-summary-list">
                <div className="lr-summary-item">
                  <div className="lr-item-left">
                    <span className="lr-dot lr-dot-blue">✕</span>
                    <div>
                      <p className="lr-item-title">Total Leave Today</p>
                      <p className="lr-item-sub">Delivery Boys</p>
                    </div>
                  </div>
                  <span className="lr-item-count">8</span>
                </div>

                <div className="lr-summary-item">
                  <div className="lr-item-left">
                    <span className="lr-dot lr-dot-orange">✓</span>
                    <p className="lr-item-title">Pending Approval</p>
                  </div>
                  <span className="lr-item-count lr-count-orange">5</span>
                </div>

                <div className="lr-summary-item">
                  <div className="lr-item-left">
                    <span className="lr-dot lr-dot-green">✓</span>
                    <p className="lr-item-title">Approved Today</p>
                  </div>
                  <span className="lr-item-count lr-count-green">3</span>
                </div>

                <div className="lr-summary-item">
                  <div className="lr-item-left">
                    <span className="lr-dot lr-dot-red">✕</span>
                    <p className="lr-item-title">Rejected Today</p>
                  </div>
                  <span className="lr-item-count lr-count-red">1</span>
                </div>
              </div>
            </div>

            {/* Upcoming Leaves Card */}
            <div className="lr-card lr-side-card">
              <div className="lr-side-head">
                <Calendar size={18} className="lr-side-head-icon" />
                <h4>Upcoming Leaves</h4>
              </div>
              <div className="lr-upcoming-list">
                <div className="lr-upcoming-item">
                  <div className="lr-user-info">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Rahul Das" />
                    <div>
                      <p className="lr-user-name">Rahul Das</p>
                      <p className="lr-user-date">20 Jul 2026</p>
                    </div>
                  </div>
                  <span className="lr-badge lr-type-casual">Casual</span>
                </div>

                <div className="lr-upcoming-item">
                  <div className="lr-user-info">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" alt="Suresh Nayak" />
                    <div>
                      <p className="lr-user-name">Suresh Nayak</p>
                      <p className="lr-user-date">22 Jul 2026</p>
                    </div>
                  </div>
                  <span className="lr-badge lr-type-sick">Sick</span>
                </div>

                <div className="lr-upcoming-item">
                  <div className="lr-user-info">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" alt="Bikash Behera" />
                    <div>
                      <p className="lr-user-name">Bikash Behera</p>
                      <p className="lr-user-date">25 Jul 2026</p>
                    </div>
                  </div>
                  <span className="lr-badge lr-type-emergency">Emergency</span>
                </div>
              </div>
              <button className="lr-link-btn">
                View Calendar <ArrowRight size={14} />
              </button>
            </div>

            {/* Activity Timeline Card */}
            <div className="lr-card lr-side-card">
              <div className="lr-side-head">
                <Clock size={18} className="lr-side-head-icon" />
                <h4>Activity Timeline</h4>
              </div>
              <div className="lr-timeline">
                <div className="lr-timeline-item">
                  <span className="lr-time">10:30 AM</span>
                  <p className="lr-timeline-text">Santanu Bal applied for leave</p>
                </div>
                <div className="lr-timeline-item">
                  <span className="lr-time">11:15 AM</span>
                  <p className="lr-timeline-text">Rahul Das leave approved</p>
                </div>
                <div className="lr-timeline-item">
                  <span className="lr-time">12:40 PM</span>
                  <p className="lr-timeline-text">Medical document uploaded</p>
                </div>
                <div className="lr-timeline-item">
                  <span className="lr-time lr-time-red">02:00 PM</span>
                  <p className="lr-timeline-text">Amit Kumar leave rejected</p>
                </div>
              </div>
              <button className="lr-link-btn">
                View All Activity <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="lr-footer">
          <span>© 2026 Alka Drops. All rights reserved.</span>
          <span className="lr-footer-tagline">💧 Delivering Purity, Ensuring Wellness</span>
        </footer>

      </main>
    </div>
  );
};

export default LeaveRequest;