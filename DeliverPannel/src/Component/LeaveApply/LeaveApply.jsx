import React, { useState, useMemo, useRef } from 'react';
import { 
  ArrowLeft, CalendarDays, 
  Phone, UploadCloud, Send, 
  ShieldCheck, LifeBuoy, FileText, Briefcase, ChevronRight, ChevronDown, X
} from 'lucide-react';
import './LeaveApply.css';

const leaveTypes = [
  { id: 1, name: 'Personal Leave', icon: Briefcase },
  { id: 2, name: 'Sick Leave', icon: ShieldCheck },
  { id: 3, name: 'Casual Leave', icon: FileText },
];

const recentRequests = [
  { type: 'Personal Leave', icon: Briefcase, fromTo: '10 Jul 2026 - 11 Jul 2026', days: 2, status: 'Approved', statusClass: 'leave-apply-status-approved', date: '08 Jul 2026' },
  { type: 'Sick Leave', icon: ShieldCheck, fromTo: '25 Jun 2026', days: 1, status: 'Rejected', statusClass: 'leave-apply-status-rejected', date: '24 Jun 2026' },
  { type: 'Casual Leave', icon: FileText, fromTo: '15 Jun 2026 - 16 Jun 2026', days: 2, status: 'Approved', statusClass: 'leave-apply-status-approved', date: '12 Jun 2026' },
];

const LeaveApply = () => {
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const REASON_MAX_LENGTH = 250;

  // Calculate working total days
  const totalDays = useMemo(() => {
    if (!fromDate || !toDate) return '0 Days';
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = end - start;
    if (diffTime < 0) return 'Invalid Date Range';
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
  }, [fromDate, toDate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setUploadedFile(file);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="leave-apply-root">
      {/* Main Content */}
      <main className="leave-apply-main">
        {/* Page Heading */}
        <div className="leave-apply-page-head">
          <div className="leave-apply-title-group">
            <button className="leave-apply-back-btn">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="leave-apply-title">Apply Leave</h1>
              <p className="leave-apply-subtitle">Request time off for your leave</p>
            </div>
          </div>
          <img 
            src="https://img.freepik.com/premium-vector/isometric-online-food-delivery-service-fast-food-delivery-courier-scooter_212005-132.jpg?w=200" 
            alt="Delivery Scooter" 
            className="leave-apply-illustration"
          />
        </div>

        {/* Form and Sidebar Grid */}
        <div className="leave-apply-grid">
          
          {/* Left Form */}
          <div className="leave-apply-card">
            <form onSubmit={(e) => e.preventDefault()}>
              
              {/* Leave Type Dropdown */}
              <div className="leave-apply-field">
                <label className="leave-apply-label">Leave Type</label>
                <p className="leave-apply-hint">Select the type of leave you want to apply</p>
                <div className="leave-apply-dropdown">
                  <button 
                    type="button" 
                    className="leave-apply-dropdown-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="leave-apply-dropdown-btn-left">
                      {selectedLeaveType ? (
                        <>
                          <selectedLeaveType.icon size={20} className="leave-apply-input-icon" />
                          <span className="leave-apply-dropdown-value">{selectedLeaveType.name}</span>
                        </>
                      ) : (
                        <span className="leave-apply-dropdown-placeholder">Select Leave Type</span>
                      )}
                    </span>
                    <ChevronDown size={20} className={`leave-apply-dropdown-chevron ${isDropdownOpen ? 'leave-apply-open' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <ul className="leave-apply-dropdown-list">
                      {leaveTypes.map((type) => (
                        <li key={type.id}>
                          <button
                            type="button"
                            className={`leave-apply-dropdown-item ${selectedLeaveType?.id === type.id ? 'leave-apply-selected' : ''}`}
                            onClick={() => {
                              setSelectedLeaveType(type);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <type.icon size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            {type.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* From & To Date */}
              <div className="leave-apply-date-grid">
                <div className="leave-apply-field">
                  <label className="leave-apply-label">From Date</label>
                  <p className="leave-apply-hint">Select start date</p>
                  <div className="leave-apply-input-icon-wrap">
                    <CalendarDays size={20} className="leave-apply-input-icon" />
                    <input 
                      type="date" 
                      className="leave-apply-input leave-apply-input-with-icon"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="leave-apply-field">
                  <label className="leave-apply-label">To Date</label>
                  <p className="leave-apply-hint">Select end date</p>
                  <div className="leave-apply-input-icon-wrap">
                    <CalendarDays size={20} className="leave-apply-input-icon" />
                    <input 
                      type="date" 
                      className="leave-apply-input leave-apply-input-with-icon"
                      value={toDate}
                      min={fromDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Total Days */}
              <div className="leave-apply-field">
                <label className="leave-apply-label">Total Days</label>
                <p className="leave-apply-hint">Total number of leave days</p>
                <div className="leave-apply-readonly-box">
                  {totalDays}
                </div>
              </div>

              {/* Reason for Leave */}
              <div className="leave-apply-field">
                <label className="leave-apply-label">Reason for Leave</label>
                <p className="leave-apply-hint">Please provide a reason for your leave</p>
                <textarea 
                  rows={4}
                  className="leave-apply-textarea"
                  placeholder="Enter the reason for your leave..."
                  value={reason}
                  maxLength={REASON_MAX_LENGTH}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="leave-apply-textarea-footer">
                  <span className="leave-apply-char-count">{reason.length} / {REASON_MAX_LENGTH}</span>
                </div>
              </div>

              {/* Contact During Leave */}
              <div className="leave-apply-field">
                <label className="leave-apply-label">
                  Contact During Leave <span className="leave-apply-label-optional">(Optional)</span>
                </label>
                <p className="leave-apply-hint">Provide an alternate contact number</p>
                <div className="leave-apply-input-icon-wrap">
                  <Phone size={20} className="leave-apply-input-icon" />
                  <input 
                    type="tel" 
                    className="leave-apply-input leave-apply-input-with-icon"
                    placeholder="Enter contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Upload Document */}
              <div className="leave-apply-field">
                <label className="leave-apply-label">
                  Upload Document <span className="leave-apply-label-optional">(Optional)</span>
                </label>
                <p className="leave-apply-hint">Upload supporting document if any</p>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png,.pdf" 
                />

                <div 
                  className={`leave-apply-upload ${uploadedFile ? 'leave-apply-drag-active' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {!uploadedFile ? (
                    <>
                      <UploadCloud size={32} className="leave-apply-upload-icon" />
                      <p className="leave-apply-upload-text">
                        Click to upload <span className="leave-apply-upload-text-muted">or drag & drop</span>
                      </p>
                      <p className="leave-apply-upload-sub">JPG, PNG, PDF up to 5MB</p>
                    </>
                  ) : (
                    <div className="leave-apply-upload-file">
                      <FileText size={20} className="leave-apply-upload-icon" />
                      <span className="leave-apply-upload-filename">{uploadedFile.name}</span>
                      <button type="button" className="leave-apply-upload-remove" onClick={removeFile}>
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="leave-apply-actions">
                <button type="button" className="leave-apply-btn leave-apply-btn-outline">Cancel</button>
                <button type="submit" className="leave-apply-btn leave-apply-btn-solid">
                  <Send size={16} /> Submit Leave Request
                </button>
              </div>

            </form>
          </div>

          {/* Right Sidebar */}
          <div className="leave-apply-sidebar">
            
            {/* Leave Balance Card */}
            <div className="leave-apply-card">
              <div className="leave-apply-card-header" style={{ justifyContent: 'center' }}>
                <div style={{ background: 'var(--teal-50)', padding: '0.625rem', borderRadius: '0.75rem', border: '1px solid var(--teal-100)' }}>
                  <CalendarDays size={24} color="var(--teal-700)" />
                </div>
                <h3 className="leave-apply-card-title">Leave Balance</h3>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="leave-apply-balance-num">12</p>
                <p className="leave-apply-balance-label">Days Left</p>
                <p className="leave-apply-balance-total">Total Leaves: <strong>15 Days</strong></p>
                <div className="leave-apply-progress-track">
                  <div className="leave-apply-progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Leave Policy Card */}
            <div className="leave-apply-card">
              <div className="leave-apply-card-header">
                <ShieldCheck size={20} color="var(--teal-700)" />
                <h3 className="leave-apply-card-title">Leave Policy</h3>
              </div>
              <ul className="leave-apply-policy-list">
                <li><span className="leave-apply-policy-bullet">•</span> Inform at least 1 day in advance</li>
                <li><span className="leave-apply-policy-bullet">•</span> Medical leave requires document</li>
                <li><span className="leave-apply-policy-bullet">•</span> Leaves are subject to approval</li>
                <li><span className="leave-apply-policy-bullet">•</span> Unapproved leaves will be marked as absent</li>
              </ul>
              <div className="leave-apply-policy-icon-row">
                <ShieldCheck size={72} color="var(--slate-100)" />
              </div>
            </div>

            {/* Need Help Card */}
            <div className="leave-apply-card">
              <div className="leave-apply-card-header">
                <LifeBuoy size={20} color="var(--teal-700)" />
                <h3 className="leave-apply-card-title">Need Help?</h3>
              </div>
              <p className="leave-apply-help-text">
                Contact your manager or admin for any leave related queries.
              </p>
              <button type="button" className="leave-apply-btn leave-apply-btn-outline leave-apply-btn-block">
                <Phone size={16} /> Contact Support
              </button>
            </div>

          </div>
        </div>

        {/* Recent Leave Requests Section */}
        <div className="leave-apply-card leave-apply-requests-card">
          <div className="leave-apply-requests-head">
            <div className="leave-apply-card-header" style={{ marginBottom: 0 }}>
              <CalendarDays size={20} color="var(--teal-700)" />
              <h3 className="leave-apply-card-title">Recent Leave Requests</h3>
            </div>
            <button className="leave-apply-view-all">
              View All <ChevronRight size={16} />
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="leave-apply-table-wrap">
            <table className="leave-apply-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From - To</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Applied On</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req, index) => (
                  <tr key={index}>
                    <td>
                      <div className="leave-apply-table-type">
                        <req.icon size={16} color="var(--slate-400)" />
                        {req.type}
                      </div>
                    </td>
                    <td>{req.fromTo}</td>
                    <td>{req.days} Day{req.days > 1 ? 's' : ''}</td>
                    <td>
                      <span className={`leave-apply-status-badge ${req.statusClass}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>{req.date}</td>
                    <td className="leave-apply-table-chevron">
                      <ChevronRight size={18} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="leave-apply-mobile-list">
            {recentRequests.map((req, index) => (
              <div key={index} className="leave-apply-mobile-card">
                <div className="leave-apply-mobile-card-top">
                  <div className="leave-apply-mobile-card-type">
                    <req.icon size={16} color="var(--slate-400)" />
                    {req.type}
                  </div>
                  <span className={`leave-apply-status-badge ${req.statusClass}`}>
                    {req.status}
                  </span>
                </div>
                <p className="leave-apply-mobile-card-range">{req.fromTo}</p>
                <div className="leave-apply-mobile-card-bottom">
                  <span>{req.days} Day{req.days > 1 ? 's' : ''}</span>
                  <span>Applied: {req.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="leave-apply-footer">
          © 2026 Alka Drops. All rights reserved.
        </footer>

      </main>
    </div>
  );
};

export default LeaveApply;