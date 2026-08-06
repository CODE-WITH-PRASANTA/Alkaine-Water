import React, { useState } from "react";
import {
  CalendarCheck,
  Wallet,
  FileText,
  FileWarning,
  Bell,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import "./DashboardSection.css";

/* =========================================================================
   Static data
   ========================================================================= */

const QUICK_ACTIONS = [
  { id: "leave", icon: CalendarCheck, label: "Apply Leave", tone: "green" },
  { id: "wallet", icon: Wallet, label: "My Wallet", tone: "purple" },
  { id: "orders", icon: FileText, label: "Order History", tone: "orange" },
  { id: "docs", icon: FileWarning, label: "Documents", tone: "red", wide: true },
];

const NOTIFICATIONS = [
  {
    id: 1,
    text: "Your Leave request has been approved.",
    time: "20 Jul 2026, 10:30 AM",
  },
  {
    id: 2,
    text: "Monthly performance bonus of \u20B9500 added.",
    time: "19 Jul 2026, 06:15 PM",
  },
  {
    id: 3,
    text: "New order assigned for today's route.",
    time: "19 Jul 2026, 08:00 AM",
  },
];

/* =========================================================================
   Small illustrations for the Refer & Earn banner
   ========================================================================= */

const ReferBottle = () => (
  <svg viewBox="0 0 90 150" className="dbs-refer-bottle" aria-hidden="true">
    <ellipse cx="45" cy="142" rx="26" ry="6" fill="#022c2a" opacity="0.35" />
    <rect x="35" y="4" width="20" height="14" rx="4" fill="#a7f3d0" />
    <rect x="28" y="16" width="34" height="12" rx="5" fill="#5eead4" />
    <path
      d="M24 28 H66 C69 28 71 31 70.5 34 L73 50 C78 59 81 71 81 86 V128 C81 138 73 144 61 144 H29 C17 144 9 138 9 128 V86 C9 71 12 59 17 50 L19.5 34 C19 31 21 28 24 28 Z"
      fill="url(#dbsBottleGrad)"
      stroke="#ffffff"
      strokeOpacity="0.5"
      strokeWidth="1.5"
    />
    <path
      d="M17 66 C20 58 24 53 28 50"
      stroke="#ffffff"
      strokeOpacity="0.55"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <rect x="15" y="76" width="60" height="38" rx="7" fill="#ffffff" fillOpacity="0.95" />
    <text x="45" y="94" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f766e" fontFamily="Inter, sans-serif">
      ALKA
    </text>
    <text x="45" y="107" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#14b8a6" fontFamily="Inter, sans-serif" letterSpacing="2">
      DROPS
    </text>
    <defs>
      <linearGradient id="dbsBottleGrad" x1="9" y1="28" x2="81" y2="144" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#e0fdf8" />
        <stop offset="1" stopColor="#5eead4" />
      </linearGradient>
    </defs>
  </svg>
);

const ReferRiderScene = () => (
  <svg viewBox="0 0 260 170" className="dbs-refer-scene" aria-hidden="true">
    {/* phone / map mockup */}
    <rect x="150" y="10" width="98" height="150" rx="18" fill="#ffffff" fillOpacity="0.14" />
    <rect x="158" y="20" width="82" height="130" rx="10" fill="#ffffff" />
    <path
      d="M168 120 C182 90 190 70 176 55 C165 44 188 40 205 55 C218 66 224 95 232 112"
      stroke="#14b8a6"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="1 9"
    />
    <circle cx="168" cy="120" r="5" fill="#0f766e" />
    <circle cx="232" cy="112" r="5" fill="#f59e0b" />
    <rect x="166" y="30" width="66" height="8" rx="4" fill="#cbd5e1" />
    <rect x="166" y="42" width="40" height="6" rx="3" fill="#e2e8f0" />

    {/* scooter */}
    <g transform="translate(0,18)">
      <ellipse cx="78" cy="150" rx="70" ry="10" fill="#022c2a" opacity="0.25" />
      <circle cx="40" cy="140" r="16" fill="#0f172a" />
      <circle cx="40" cy="140" r="7" fill="#334155" />
      <circle cx="118" cy="140" r="16" fill="#0f172a" />
      <circle cx="118" cy="140" r="7" fill="#334155" />
      <path
        d="M32 140 H128 C132 140 134 136 132 132 L118 104 H70 L58 132 C56 136 40 140 32 140 Z"
        fill="#0d9488"
      />
      <rect x="96" y="70" width="10" height="38" rx="4" fill="#0f766e" />
      <path d="M92 70 C92 60 118 60 118 70 L118 78 H92 Z" fill="#134e4a" />
      <rect x="60" y="96" width="16" height="14" rx="4" fill="#0f766e" />

      {/* rider */}
      <circle cx="88" cy="46" r="13" fill="#f2c9a0" />
      <path d="M76 40 C76 30 100 30 100 40 L100 44 H76 Z" fill="#0f172a" />
      <rect x="72" y="58" width="34" height="38" rx="10" fill="#0f766e" />
      <path d="M78 66 L64 92" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
      <path d="M100 66 L112 88" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
      <rect x="60" y="52" width="26" height="30" rx="6" fill="#0d9488" transform="rotate(-8 73 67)" />
    </g>
  </svg>
);

/* =========================================================================
   Component
   ========================================================================= */

const DashboardSection = () => {
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);

  return (
    <div className="dbs-root">
      {/* ================= Quick actions / notifications / wallet ================= */}
      <div className="dbs-top-grid">
        {/* ---------- Quick actions ---------- */}
        <section className="dbs-card dbs-quick-card">
          <div className="dbs-card-head">
            <h2>Quick Actions</h2>
          </div>

          <div className="dbs-quick-grid">
            {QUICK_ACTIONS.map(({ id, icon: Icon, label, tone, wide }) => (
              <button
                key={id}
                type="button"
                className={`dbs-quick-item dbs-quick-item--${tone}${wide ? " dbs-quick-item--wide" : ""}`}
              >
                <Icon size={20} strokeWidth={2.2} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------- Recent notifications ---------- */}
        <section className="dbs-card dbs-notif-card">
          <div className="dbs-card-head">
            <h2>Recent Notifications</h2>
            <button type="button" className="dbs-link-btn">
              View All
            </button>
          </div>

          <ul className="dbs-notif-list">
            {NOTIFICATIONS.map((n) => (
              <li key={n.id} className="dbs-notif-item">
                <span className="dbs-notif-icon">
                  <Bell size={15} strokeWidth={2.2} />
                </span>
                <div className="dbs-notif-body">
                  <p className="dbs-notif-text">{n.text}</p>
                  <p className="dbs-notif-time">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Wallet balance ---------- */}
        <section className="dbs-card dbs-wallet-card">
          <div className="dbs-card-head">
            <div className="dbs-wallet-title">
              <span className="dbs-wallet-icon">
                <Wallet size={16} strokeWidth={2.2} />
              </span>
              <h2>Wallet Balance</h2>
            </div>

            <div className="dbs-menu-wrap">
              <button
                type="button"
                className="dbs-icon-btn"
                aria-label="More options"
                onClick={() => setWalletMenuOpen((v) => !v)}
              >
                <MoreVertical size={17} strokeWidth={2.2} />
              </button>

              {walletMenuOpen && (
                <div className="dbs-menu">
                  <button type="button" className="dbs-menu-option">
                    Transaction History
                  </button>
                  <button type="button" className="dbs-menu-option">
                    Download Statement
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="dbs-wallet-amount">₹1,250.00</div>
          <p className="dbs-wallet-caption">Available Balance</p>

          <div className="dbs-wallet-actions">
            <button type="button" className="dbs-btn dbs-btn--outline">
              Withdraw
            </button>
            <button type="button" className="dbs-btn dbs-btn--solid">
              Add Money
            </button>
          </div>
        </section>
      </div>

      {/* ================= Refer & Earn banner ================= */}
      <section className="dbs-refer-banner">
        <div className="dbs-refer-glow dbs-refer-glow--a" />
        <div className="dbs-refer-glow dbs-refer-glow--b" />

        <div className="dbs-refer-art dbs-refer-art--left">
          <ReferBottle />
        </div>

        <div className="dbs-refer-content">
          <h2>Refer &amp; Earn</h2>
          <p>Refer a new delivery partner and earn upto ₹1000</p>
          <button type="button" className="dbs-refer-btn">
            Refer Now
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="dbs-refer-art dbs-refer-art--right">
          <ReferRiderScene />
        </div>
      </section>
    </div>
  );
};

export default DashboardSection;