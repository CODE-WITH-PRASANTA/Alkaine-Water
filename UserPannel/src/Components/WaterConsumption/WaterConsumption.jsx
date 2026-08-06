import React from "react";
import {
  Droplet,
  Zap,
  ShieldCheck,
  Truck,
  Lock,
  Headphones,
  Check,
  Sparkles,
  Gift,
  Wallet,
  ArrowRight,
} from "lucide-react";
import "./WaterConsumption.css";

/* =========================================================================
   Icon art — layered SVGs with light/shadow so they read as "product"
   illustrations rather than flat glyphs.
   ========================================================================= */

const BottleIcon = ({ size = 46, tone = "blue" }) => {
  const tones = {
    blue: { top: "#dbeafe", bottom: "#3b82f6", ring: "#1d4ed8", label: "#1d4ed8" },
    gold: { top: "#fef3c7", bottom: "#f59e0b", ring: "#b45309", label: "#b45309" },
  };
  const c = tones[tone];
  const uid = React.useId();
  return (
    <svg width={size} height={size * 1.75} viewBox="0 0 60 105" fill="none">
      <ellipse cx="30" cy="99" rx="19" ry="4" fill="#0f172a" opacity="0.08" />
      <rect x="24" y="2" width="12" height="9" rx="2.5" fill={c.bottom} />
      <rect x="19" y="9" width="22" height="8" rx="3" fill={c.ring} />
      <path
        d="M17 17 H43 C45 17 46.5 19 46.3 21 L48 33 C51.5 39.5 53.5 47.5 53.5 57 V88 C53.5 95 47.5 98.5 40 98.5 H20 C12.5 98.5 6.5 95 6.5 88 V57 C6.5 47.5 8.5 39.5 12 33 L13.7 21 C13.5 19 15 17 17 17 Z"
        fill={`url(#${uid}-body)`}
        stroke={c.ring}
        strokeWidth="1.4"
      />
      <path
        d="M11 44 C13.5 39.5 16 36.5 18.5 34.5"
        stroke="#ffffff"
        strokeOpacity="0.65"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M46 58 C48 66 48 76 46 86"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="10" y="50" width="40" height="28" rx="5" fill="#ffffff" fillOpacity="0.95" />
      <rect x="10" y="50" width="40" height="28" rx="5" stroke={c.ring} strokeOpacity="0.15" />
      <text x="30" y="61.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={c.label} fontFamily="Inter, sans-serif" letterSpacing="0.5">
        ALKA
      </text>
      <text x="30" y="72" textAnchor="middle" fontSize="6.2" fontWeight="700" fill={c.bottom} fontFamily="Inter, sans-serif" letterSpacing="2">
        DROPS
      </text>
      <defs>
        <linearGradient id={`${uid}-body`} x1="6.5" y1="17" x2="53.5" y2="98.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.top} />
          <stop offset="1" stopColor={c.bottom} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const GiftIcon = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="57" rx="20" ry="3.5" fill="#0f172a" opacity="0.08" />
    <rect x="9" y="27" width="46" height="28" rx="4" fill="url(#giftBoxGrad)" />
    <rect x="9" y="27" width="46" height="10" fill="#0ea86b" />
    <rect x="27" y="27" width="10" height="28" fill="#059862" />
    <path d="M32 27c-4-11-17-13-17-3.2 0 5.4 8.5 6.6 17 3.2Z" fill="url(#giftBowGrad1)" />
    <path d="M32 27c4-11 17-13 17-3.2 0 5.4-8.5 6.6-17 3.2Z" fill="url(#giftBowGrad2)" />
    <circle cx="32" cy="27" r="3.4" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
    <rect x="9" y="27" width="46" height="28" rx="4" stroke="#047857" strokeOpacity="0.25" />
    <defs>
      <linearGradient id="giftBoxGrad" x1="9" y1="27" x2="55" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#34d399" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="giftBowGrad1" x1="15" y1="17" x2="32" y2="27" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fde047" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="giftBowGrad2" x1="32" y1="17" x2="49" y2="27" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
    </defs>
  </svg>
);

const WalletIcon = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="30" cy="52" rx="21" ry="3.5" fill="#0f172a" opacity="0.08" />
    <rect x="5" y="15" width="47" height="35" rx="7" fill="url(#walletBodyGrad)" />
    <rect x="5" y="24" width="47" height="6.5" fill="#fbbf24" opacity="0.95" />
    <rect x="5" y="15" width="47" height="35" rx="7" stroke="#1e3a8a" strokeOpacity="0.3" />
    <rect x="33" y="29" width="21" height="15" rx="4.5" fill="url(#walletClaspGrad)" />
    <circle cx="43.5" cy="36.5" r="2.7" fill="#fde68a" stroke="#b45309" strokeWidth="0.8" />
    <path d="M9 20 L48 20" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="walletBodyGrad" x1="5" y1="15" x2="52" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#3b82f6" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="walletClaspGrad" x1="33" y1="29" x2="54" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1e293b" />
        <stop offset="1" stopColor="#0f172a" />
      </linearGradient>
    </defs>
  </svg>
);

/* =========================================================================
   Data
   ========================================================================= */

const plans = [
  {
    name: "Basic Plan",
    bottles: "15 Bottles / Month",
    features: ["Daily Delivery", "Free Delivery"],
    price: "699",
    popular: false,
    tone: "blue",
  },
  {
    name: "Premium Plan",
    bottles: "30 Bottles / Month",
    features: ["Daily Delivery", "Free Delivery", "Priority Support"],
    price: "1,299",
    popular: true,
    tone: "gold",
  },
  {
    name: "Family Plan",
    bottles: "60 Bottles / Month",
    features: ["Daily Delivery", "Free Delivery", "Priority Support", "Weekend Delivery"],
    price: "2,199",
    popular: false,
    tone: "blue",
  },
];

const features = [
  { icon: Droplet, title: "100% Pure & Safe", sub: "Lab Tested Water" },
  { icon: Zap, title: "Maintains pH Balance", sub: "8+ Alkaline Water" },
  { icon: ShieldCheck, title: "RO + UV + UF", sub: "Advanced Purification" },
  { icon: Truck, title: "Timely Delivery", sub: "At Your Doorstep" },
  { icon: Lock, title: "Secure Payments", sub: "100% Safe & Secure" },
  { icon: Headphones, title: "Dedicated Support", sub: "We Care For You" },
];

/* =========================================================================
   Component
   ========================================================================= */

const WaterConsumption = () => {
  return (
    <div className="wc-root">
      <div className="wc-grid">
        {/* ---------------- Subscription plans ---------------- */}
        <section className="wc-card wc-plans-card">
          <header className="wc-header">
            <span className="wc-eyebrow">
              <Sparkles size={13} strokeWidth={2.5} />
              Subscription
            </span>
            <h2>Our Subscription Plans</h2>
            <p>Choose the best plan for your family</p>
          </header>

          <div className="wc-plans">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`wc-plan${plan.popular ? " wc-plan--popular" : ""}`}
              >
                {plan.popular && (
                  <span className="wc-badge">
                    <Sparkles size={11} strokeWidth={2.5} />
                    Most Popular
                  </span>
                )}

                <div className="wc-plan-head">
                  <h3>{plan.name}</h3>
                  <p>{plan.bottles}</p>
                </div>

                <div className="wc-plan-art">
                  <BottleIcon tone={plan.tone} />
                </div>

                <ul className="wc-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="wc-check">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="wc-plan-price">
                  <span className="wc-currency">₹</span>
                  <span className="wc-price">{plan.price}</span>
                  <span className="wc-duration">/ month</span>
                </div>

                <button className={`wc-btn${plan.popular ? " wc-btn--gold" : ""}`}>
                  Subscribe Now
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Sidebar ---------------- */}
        <aside className="wc-sidebar">
          <div className="wc-card wc-refer">
            <div className="wc-sidebar-row">
              <div>
                <div className="wc-sidebar-icon-tag">
                  <Gift size={13} strokeWidth={2.5} />
                  Rewards
                </div>
                <h3>Refer &amp; Earn</h3>
                <p className="wc-sidebar-sub">Invite your friends and earn</p>
                <div className="wc-big-amount">₹100</div>
                <p className="wc-sidebar-sub">for every successful subscription</p>
              </div>
              <div className="wc-icon-plate wc-icon-plate--green">
                <GiftIcon />
              </div>
            </div>
            <button className="wc-btn wc-btn--block">
              Invite Now
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>

          <div className="wc-card wc-wallet">
            <div className="wc-sidebar-row">
              <div>
                <div className="wc-sidebar-icon-tag wc-sidebar-icon-tag--blue">
                  <Wallet size={13} strokeWidth={2.5} />
                  Balance
                </div>
                <h3>Wallet Balance</h3>
                <div className="wc-big-amount">₹320.00</div>
                <p className="wc-sidebar-sub">Available Balance</p>
              </div>
              <div className="wc-icon-plate wc-icon-plate--blue">
                <WalletIcon />
              </div>
            </div>
            <button className="wc-btn wc-btn--block">
              Add Money
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </aside>
      </div>

      {/* ---------------- Feature strip ---------------- */}
      <section className="wc-card wc-features">
        <div className="wc-features-head">
          <h3 className="wc-features-title">Why Choose Alka Drops?</h3>
          <p className="wc-features-subtitle">Trusted by thousands of families every day</p>
        </div>
        <div className="wc-features-grid">
          {features.map(({ icon: Icon, title, sub }, i) => (
            <div className="wc-feature" key={title}>
              {i !== 0 && <span className="wc-feature-divider" aria-hidden="true" />}
              <div className="wc-feature-icon">
                <Icon size={18} strokeWidth={2.2} />
              </div>
              <div>
                <h4>{title}</h4>
                <p>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WaterConsumption;