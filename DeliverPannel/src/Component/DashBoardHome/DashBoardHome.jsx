import React, { useMemo, useState } from "react";
import {
  Package,
  CalendarCheck,
  Clock,
  Wallet,
  Phone,
  Mail,
  MapPin,
  Crown,
  ChevronDown,
  Check,
  TrendingUp,
  Bike,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import "./DashBoardHome.css";

/* =========================================================================
   Static data
   ========================================================================= */

const STATS = [
  {
    id: "deliveries",
    icon: Package,
    tone: "teal",
    label: "Today's Deliveries",
    value: "12",
    unit: "Orders",
    footNote: "+2 from yesterday",
    footTone: "positive",
  },
  {
    id: "completed",
    icon: CalendarCheck,
    tone: "blue",
    label: "Completed",
    value: "10",
    unit: "Orders",
    footNote: "83% Completion",
    footTone: "progress",
    progress: 83,
  },
  {
    id: "pending",
    icon: Clock,
    tone: "purple",
    label: "Pending",
    value: "2",
    unit: "Orders",
    footNote: "Remaining",
    footTone: "neutral",
  },
  {
    id: "earnings",
    icon: Wallet,
    tone: "green",
    label: "Today's Earnings",
    value: "₹650",
    unit: "",
    footNote: "+ ₹80 from yesterday",
    footTone: "positive",
  },
];

const SCHEDULE = [
  {
    id: 1,
    time: "09:00 AM",
    place: "KIIT Square, Patia",
    orders: "2 Orders",
    status: "completed",
    dot: "teal",
  },
  {
    id: 2,
    time: "11:30 AM",
    place: "Infocity, Chandaka",
    orders: "3 Orders",
    status: "completed",
    dot: "teal",
  },
  {
    id: 3,
    time: "02:00 PM",
    place: "Nayapalli, Bhubaneswar",
    orders: "4 Orders",
    status: "in-progress",
    dot: "orange",
  },
  {
    id: 4,
    time: "04:30 PM",
    place: "Khandagiri, Bhubaneswar",
    orders: "2 Orders",
    status: "pending",
    dot: "blue",
  },
  {
    id: 5,
    time: "06:00 PM",
    place: "Chandrasekharpur, Bhubaneswar",
    orders: "1 Order",
    status: "pending",
    dot: "blue",
  },
  {
    id: 6,
    time: "07:15 PM",
    place: "Jaydev Vihar, Bhubaneswar",
    orders: "3 Orders",
    status: "pending",
    dot: "blue",
  },
];

const STATUS_META = {
  completed: { label: "Completed", className: "dbh-tag--green" },
  "in-progress": { label: "In Progress", className: "dbh-tag--orange" },
  pending: { label: "Pending", className: "dbh-tag--blue" },
};

const EARNINGS_BY_PERIOD = {
  "This Week": {
    total: "₹3,250",
    change: "+18%",
    changeLabel: "from last week",
    today: "₹650",
    period: "₹2,100",
    periodLabel: "This Week",
    month: "₹12,450",
    peakLabel: "₹650",
    data: [
      { label: "Mon", value: 380 },
      { label: "Tue", value: 520 },
      { label: "Wed", value: 430 },
      { label: "Thu", value: 610 },
      { label: "Fri", value: 650 },
      { label: "Sat", value: 560 },
      { label: "Sun", value: 700 },
    ],
    peakIndex: 4,
  },
  "This Month": {
    total: "₹12,450",
    change: "+9%",
    changeLabel: "from last month",
    today: "₹650",
    period: "₹9,800",
    periodLabel: "This Month",
    month: "₹12,450",
    peakLabel: "₹720",
    data: [
      { label: "W1", value: 2450 },
      { label: "W2", value: 2980 },
      { label: "W3", value: 2760 },
      { label: "W4", value: 3260 },
    ],
    peakIndex: 3,
  },
  "This Year": {
    total: "₹1,42,300",
    change: "+24%",
    changeLabel: "from last year",
    today: "₹650",
    period: "₹96,200",
    periodLabel: "This Year",
    month: "₹12,450",
    peakLabel: "₹15,200",
    data: [
      { label: "Jan", value: 9800 },
      { label: "Feb", value: 10800 },
      { label: "Mar", value: 11200 },
      { label: "Apr", value: 12100 },
      { label: "May", value: 13400 },
      { label: "Jun", value: 15200 },
    ],
    peakIndex: 5,
  },
};

const PERIOD_OPTIONS = Object.keys(EARNINGS_BY_PERIOD);

const SUBSCRIPTION_BENEFITS = [
  "Unlimited Deliveries",
  "Priority Support",
  "Insurance Coverage",
  "Fuel & Maintenance Offers",
];

/* =========================================================================
   Small building blocks
   ========================================================================= */

const StatCard = ({ icon: Icon, tone, label, value, unit, footNote, footTone, progress }) => (
  <div className="dbh-card dbh-stat-card">
    <div className={`dbh-stat-icon dbh-stat-icon--${tone}`}>
      <Icon size={20} strokeWidth={2.2} />
    </div>
    <div className="dbh-stat-body">
      <p className="dbh-stat-label">{label}</p>
      <div className="dbh-stat-value-row">
        <span className="dbh-stat-value">{value}</span>
        {unit && <span className="dbh-stat-unit">{unit}</span>}
      </div>
    </div>
    <div className="dbh-stat-foot">
      {footTone === "progress" ? (
        <>
          <span className="dbh-stat-foot-text">{footNote}</span>
          <div className="dbh-progress-track">
            <div className="dbh-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </>
      ) : (
        <span className={`dbh-stat-foot-text dbh-stat-foot-text--${footTone}`}>{footNote}</span>
      )}
    </div>
  </div>
);

const ChartDot = (props) => {
  const { cx, cy, index, activeIndex } = props;
  if (index !== activeIndex) return null;
  return (
    <circle cx={cx} cy={cy} r={5} fill="#0d9488" stroke="#ffffff" strokeWidth={2.5} />
  );
};

/* =========================================================================
   Component
   ========================================================================= */

const DashBoardHome = () => {
  const [period, setPeriod] = useState("This Week");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [showAllSchedule, setShowAllSchedule] = useState(false);

  const earnings = EARNINGS_BY_PERIOD[period];
  const visibleSchedule = showAllSchedule ? SCHEDULE : SCHEDULE.slice(0, 4);

  const chartMax = useMemo(
    () => Math.max(...earnings.data.map((d) => d.value)),
    [earnings]
  );

  return (
    <div className="dbh-root">
      <div className="dbh-page-grid">
        <div className="dbh-main-col">
          {/* ================= Stats row ================= */}
          <div className="dbh-stats-grid">
            {STATS.map((s) => (
              <StatCard key={s.id} {...s} />
            ))}
          </div>

          {/* ================= Main grid ================= */}
          <div className="dbh-main-grid">
        {/* ---------- Delivery schedule ---------- */}
        <section className="dbh-card dbh-schedule-card">
          <div className="dbh-card-head">
            <h2>Today's Delivery Schedule</h2>
            <button
              type="button"
              className="dbh-pill-btn"
              onClick={() => setShowAllSchedule((v) => !v)}
            >
              {showAllSchedule ? "Show Less" : "View All"}
            </button>
          </div>

          <ol className="dbh-timeline">
            {visibleSchedule.map((item, i) => (
              <li className="dbh-timeline-item" key={item.id}>
                <div className="dbh-timeline-marker">
                  <span className={`dbh-timeline-dot dbh-timeline-dot--${item.dot}`} />
                  {i !== visibleSchedule.length - 1 && (
                    <span className="dbh-timeline-line" />
                  )}
                </div>
                <div className="dbh-timeline-time">{item.time}</div>
                <div className="dbh-timeline-info">
                  <p className="dbh-timeline-place">{item.place}</p>
                  <p className="dbh-timeline-orders">{item.orders}</p>
                </div>
                <span className={`dbh-tag ${STATUS_META[item.status].className}`}>
                  {item.status === "completed" && <Check size={12} strokeWidth={3} />}
                  {item.status === "in-progress" && <Clock size={12} strokeWidth={2.5} />}
                  {item.status === "pending" && <Clock size={12} strokeWidth={2.5} />}
                  {STATUS_META[item.status].label}
                </span>
              </li>
            ))}
          </ol>

          <button type="button" className="dbh-route-btn">
            View Full Route
          </button>
        </section>

        {/* ---------- Earnings overview ---------- */}
        <section className="dbh-card dbh-earnings-card">
          <div className="dbh-card-head">
            <h2>Earnings Overview</h2>

            <div className="dbh-dropdown">
              <button
                type="button"
                className="dbh-dropdown-trigger"
                onClick={() => setPeriodOpen((v) => !v)}
              >
                {period}
                <ChevronDown
                  size={15}
                  strokeWidth={2.5}
                  className={`dbh-dropdown-caret${periodOpen ? " dbh-dropdown-caret--open" : ""}`}
                />
              </button>

              {periodOpen && (
                <div className="dbh-dropdown-menu">
                  {PERIOD_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`dbh-dropdown-option${opt === period ? " dbh-dropdown-option--active" : ""}`}
                      onClick={() => {
                        setPeriod(opt);
                        setPeriodOpen(false);
                      }}
                    >
                      {opt}
                      {opt === period && <Check size={14} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dbh-earnings-summary">
            <span className="dbh-earnings-total">{earnings.total}</span>
            <span className="dbh-earnings-change">
              <TrendingUp size={13} strokeWidth={2.5} />
              {earnings.change}
            </span>
          </div>
          <p className="dbh-earnings-caption">Total Earnings</p>

          <div className="dbh-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earnings.data} margin={{ top: 28, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="dbhAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
                  dy={6}
                />
                <YAxis hide domain={[0, chartMax * 1.35]} />
                <Tooltip
                  cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
                  content={({ active, payload, label }) =>
                    active && payload && payload.length ? (
                      <div className="dbh-chart-tooltip">
                        <strong>₹{payload[0].value.toLocaleString("en-IN")}</strong>
                        <span>{label}</span>
                      </div>
                    ) : null
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  fill="url(#dbhAreaFill)"
                  dot={(props) => (
                    <ChartDot key={props.index} {...props} activeIndex={earnings.peakIndex} />
                  )}
                  activeDot={{ r: 5, fill: "#0d9488", stroke: "#ffffff", strokeWidth: 2 }}
                />
                <ReferenceDot
                  x={earnings.data[earnings.peakIndex].label}
                  y={earnings.data[earnings.peakIndex].value}
                  r={0}
                  label={{
                    value: earnings.peakLabel,
                    position: "top",
                    fill: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="dbh-earnings-breakdown">
            <div className="dbh-breakdown-item">
              <span className="dbh-breakdown-value">{earnings.today}</span>
              <span className="dbh-breakdown-label">Today</span>
            </div>
            <div className="dbh-breakdown-divider" />
            <div className="dbh-breakdown-item">
              <span className="dbh-breakdown-value">{earnings.period}</span>
              <span className="dbh-breakdown-label">{earnings.periodLabel}</span>
            </div>
            <div className="dbh-breakdown-divider" />
            <div className="dbh-breakdown-item">
              <span className="dbh-breakdown-value">{earnings.month}</span>
              <span className="dbh-breakdown-label">This Month</span>
            </div>
          </div>
        </section>

          </div>
        </div>

        {/* ---------- Profile + subscription ---------- */}
        <aside className="dbh-side-col">
          <section className="dbh-card dbh-profile-card">
            <div className="dbh-avatar-wrap">
              <span className="dbh-avatar-splash dbh-avatar-splash--a" />
              <span className="dbh-avatar-splash dbh-avatar-splash--b" />
              <div className="dbh-avatar">
                <Bike size={30} strokeWidth={2} />
              </div>
            </div>

            <div className="dbh-profile-name-row">
              <h3>Santanu Bal</h3>
              <span className="dbh-tag dbh-tag--green">Active</span>
            </div>

            <div className="dbh-profile-id">
              <span>Delivery Partner ID</span>
              <strong>DLV2026001</strong>
            </div>

            <ul className="dbh-contact-list">
              <li>
                <Phone size={14} strokeWidth={2.2} />
                +91 99377 2458
              </li>
              <li>
                <Mail size={14} strokeWidth={2.2} />
                santanu.bal@example.com
              </li>
              <li>
                <MapPin size={14} strokeWidth={2.2} />
                Bhubaneswar, Odisha
              </li>
            </ul>

            <button type="button" className="dbh-outline-btn">
              View Profile
            </button>
          </section>

          <section className="dbh-card dbh-subscription-card">
            <div className="dbh-subscription-head">
              <Crown size={16} strokeWidth={2.2} fill="currentColor" />
              My Subscription
            </div>

            <div className="dbh-subscription-body">
              <div className="dbh-subscription-plan-row">
                <span className="dbh-subscription-plan">Premium Plan</span>
                <span className="dbh-tag dbh-tag--green">Active</span>
              </div>

              <div className="dbh-subscription-valid">
                <span>Valid Till</span>
                <strong>31 Aug 2026</strong>
              </div>

              <ul className="dbh-subscription-benefits">
                {SUBSCRIPTION_BENEFITS.map((benefit) => (
                  <li key={benefit}>
                    <CheckCircle2 size={16} strokeWidth={2.2} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="dbh-manage-btn">
                Manage Subscription
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};


export default DashBoardHome;