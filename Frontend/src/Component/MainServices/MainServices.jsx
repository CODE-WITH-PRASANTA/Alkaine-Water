import React from "react";
import "./MainServices.css";

import { GiWaterGallon } from "react-icons/gi";
import { BiWater } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";

// Images
import bottledWaterImg from "../../assets/wat 2.jpg";
import dispenserImg from "../../assets/wat 3.jpg";
import trailerImg from "../../assets/wat4.jpg";

const MainServices = () => {
  return (
    <section
      className="MainServices-wrapper"
      id="services"
      aria-labelledby="main-services-heading"
    >
      {/* =========================================================
          BACKGROUND PATTERN
      ========================================================= */}
      <div
        className="MainServices-bg-pattern"
        aria-hidden="true"
      ></div>

      <div className="MainServices-container">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <header className="MainServices-header">

          <span className="MainServices-subtitle">
            ALKA DROPS SERVICES
          </span>

          {/* Main SEO Heading */}
          <h1
            className="MainServices-title"
            id="main-services-heading"
          >
            Best Water Suppliers in Bhubaneswar

            <span>
              20 Litre Water Bottle &amp; Drinking Water Supply
            </span>
          </h1>

          {/* Main Introduction */}
          <p className="MainServices-description">
            Alka Drops provides reliable drinking water solutions for homes,
            offices, shops, schools, and businesses across Bhubaneswar. We
            provide packaged drinking water, 20 litre water bottles, convenient
            delivery, and dependable water supply services for everyday needs.
          </p>

          <p className="MainServices-description">
            If you are looking for trusted{" "}
            <strong>water suppliers in Bhubaneswar</strong>, Alka Drops offers
            practical drinking water solutions with convenient local delivery
            and customer-focused service.
          </p>

          {/* Wave Divider */}
          <div className="MainServices-wave-divider">
            <svg
              viewBox="0 0 56 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 9C5 9 7 3 11 3C15 3 17 9 21 9C25 9 27 3 31 3C35 3 37 9 41 9C45 9 47 3 51 3C55 3 57 9 61 9"
                stroke="#0056b3"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M1 5C5 5 7 -1 11 -1C15 -1 17 5 21 5C25 5 27 -1 31 -1C35 -1 37 5 41 5C45 5 47 -1 51 -1C55 -1 57 5 61 5"
                stroke="#a3bffa"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        </header>

        {/* =========================================================
            SERVICES GRID
        ========================================================= */}
        <div className="MainServices-grid">

          {/* =====================================================
              SERVICE 1 - PACKAGED DRINKING WATER
          ===================================================== */}
          <article className="MainServices-card">

            <div className="MainServices-card-banner">

              <div className="MainServices-image-frame">

                <img
                  src={bottledWaterImg}
                  alt="20 litre packaged drinking water bottles supplied by Alka Drops in Bhubaneswar Odisha"
                  loading="lazy"
                />

                <div
                  className="MainServices-icon-badge"
                  aria-hidden="true"
                >
                  <GiWaterGallon className="MainServices-badge-icon" />
                </div>

              </div>

            </div>

            <div className="MainServices-card-content">

              <h2>
                20 Litre Packaged Drinking Water
              </h2>

              <p>
                Alka Drops provides hygienic packaged drinking water and
                20 litre water bottles for homes, offices, shops, schools,
                and businesses across Bhubaneswar.
              </p>

              <p>
                Our service is suitable for customers searching for{" "}
                <strong>
                  20 litre water bottle suppliers in Bhubaneswar
                </strong>{" "}
                with convenient and regular water delivery.
              </p>

              <a
                href="/services/bottled-water"
                className="MainServices-link"
                aria-label="Read more about 20 litre packaged drinking water from Alka Drops"
              >
                READ MORE
              </a>

            </div>
          </article>

          {/* =====================================================
              SERVICE 2 - WATER DISPENSERS
          ===================================================== */}
          <article className="MainServices-card">

            <div className="MainServices-card-banner">

              <div className="MainServices-image-frame">

                <img
                  src={dispenserImg}
                  alt="Water dispenser for drinking water supply in Bhubaneswar by Alka Drops"
                  loading="lazy"
                />

                <div
                  className="MainServices-icon-badge"
                  aria-hidden="true"
                >
                  <BiWater className="MainServices-badge-icon" />
                </div>

              </div>

            </div>

            <div className="MainServices-card-content">

              <h2>
                Water Dispensers for Homes &amp; Offices
              </h2>

              <p>
                Make everyday drinking water more convenient with practical
                water dispensers for homes, offices, schools, clinics,
                and commercial spaces in Bhubaneswar.
              </p>

              <p>
                Alka Drops supports customers who need a convenient{" "}
                <strong>
                  drinking water supply in Bhubaneswar
                </strong>{" "}
                along with dependable water dispensing solutions.
              </p>

              <a
                href="/services/water-dispenser"
                className="MainServices-link"
                aria-label="Read more about Alka Drops water dispensers in Bhubaneswar"
              >
                READ MORE
              </a>

            </div>
          </article>

          {/* =====================================================
              SERVICE 3 - BULK WATER SUPPLY
          ===================================================== */}
          <article className="MainServices-card">

            <div className="MainServices-card-banner">

              <div className="MainServices-image-frame">

                <img
                  src={trailerImg}
                  alt="Bulk water supply and water delivery service by Alka Drops in Bhubaneswar Odisha"
                  loading="lazy"
                />

                <div
                  className="MainServices-icon-badge"
                  aria-hidden="true"
                >
                  <MdLocalShipping className="MainServices-badge-icon" />
                </div>

              </div>

            </div>

            <div className="MainServices-card-content">

              <h2>
                Bulk Water Supply in Bhubaneswar
              </h2>

              <p>
                Alka Drops provides reliable bulk water delivery for
                construction sites, events, commercial requirements,
                and other locations that need larger quantities of water.
              </p>

              <p>
                For dependable{" "}
                <strong>
                  water supply in Bhubaneswar
                </strong>
                , customers can contact our team to discuss quantity,
                delivery location, and service requirements.
              </p>

              <a
                href="/services/water-trailers"
                className="MainServices-link"
                aria-label="Read more about Alka Drops bulk water supply in Bhubaneswar"
              >
                READ MORE
              </a>

            </div>
          </article>

        </div>

        {/* =========================================================
            SEO CONTENT
        ========================================================= */}
        <section
          className="MainServices-seo-content"
          aria-labelledby="water-supply-seo-heading"
        >

          <h2 id="water-supply-seo-heading">
            Reliable Drinking Water Supply in Bhubaneswar, Odisha
          </h2>

          <p>
            Alka Drops is a local drinking water supplier serving customers
            across Bhubaneswar with packaged drinking water, 20 litre bottle
            delivery, water dispensers, and bulk water solutions. Whether you
            need water for your home, office, shop, school, or business, our
            goal is to make regular water supply simple and convenient.
          </p>

          <p>
            Customers searching for{" "}
            <strong>
              20 litre water supply near me home delivery
            </strong>{" "}
            can contact Alka Drops to enquire about bottle availability,
            delivery options, pricing, and service areas. We aim to provide
            convenient drinking water solutions for customers throughout
            Bhubaneswar.
          </p>

          <p>
            If you are comparing{" "}
            <strong>
              20 litre water bottle suppliers in Bhubaneswar price
            </strong>
            , our team can provide current pricing and delivery information
            based on your requirement and location.
          </p>

          <p>
            For customers searching for a{" "}
            <strong>
              Bhubaneswar water supply helpline number
            </strong>
            , Alka Drops can be contacted directly at{" "}
            <a
              href="tel:+917327092477"
              aria-label="Call Alka Drops at plus 91 7327092477"
            >
              +91 7327092477
            </a>
            .
          </p>

          {/* =====================================================
              SEO KEYWORD TAGS
          ===================================================== */}
          <div
            className="MainServices-seo-tags"
            aria-label="Alka Drops water services"
          >

            <span>
              Water Suppliers in Bhubaneswar
            </span>

            <span>
              20 Litre Water Supply
            </span>

            <span>
              Drinking Water Supply
            </span>

            <span>
              Water Delivery in Bhubaneswar
            </span>

            <span>
              Packaged Drinking Water
            </span>

            <span>
              Water Bottle Home Delivery
            </span>

          </div>

        </section>

      </div>
    </section>
  );
};

export default MainServices;