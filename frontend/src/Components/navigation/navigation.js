import React, { useState } from "react";
import logo from "../../media/logo.png";
import "./scss/navigation.scss";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [slide, setSlide] = useState("burger");
  const showSlide = () => {
    setSlide("cross");
  };
  const hideSlide = () => {
    setSlide("burger");
  };

  return (
    <>
      <div className={`navigation ${slide}-navigation`}>
        <div
          className={`nav-hamburger ${slide}-hide-burger`}
          onClick={showSlide}
        >
          <i class="fas fa-bars"></i>
        </div>
        <div className={`nav-cross ${slide}-hide-cross`} onClick={hideSlide}>
          <i class="fas fa-times"></i>
        </div>
        <div className={`nav-logo ${slide}-nav-logo`}>
          <img src={logo} alt="Logo" />
        </div>
        <Link className="nav-links" to="/">
          <div className="nav-icon">
            <i class="fas fa-home"></i>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>Home</div>
        </Link>
        <Link className="nav-links" to="/history">
          <div className="nav-icon">
            <i class="fas fa-paper-plane"></i>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>
            Mail History
          </div>
        </Link>
        <Link className="nav-links" to="/campaigns">
          <div className="nav-icon">
            <i class="fas fa-rocket"></i>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>
            Campaigns
          </div>
        </Link>
        <Link className="nav-links" to="/contacts">
          <div className="nav-icon">
            <i class="fas fa-user"></i>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>Contacts</div>
        </Link>
        <div className="nav-logout">
          <div className="nav-icon">
            <i class="fas fa-sign-out-alt"></i>
          </div>
          <div className={`nav-link-item ${slide}-nav-link-item`}>Log Out</div>
        </div>
      </div>
    </>
  );
};

export const MobileNavigationTop = () => {
  return (
    <>
      <div className="mobile-navigation">
        <div className="top">
          <div className="mobile-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="mobile-logout">
            <i class="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export const MobileNavigationBottom = () => {
  return (
    <>
      <div className="mobile-navigation">
        <div className="bottom">
          <div className="mobile-nav-links">
            <Link className="mobile-nav-icon">
              <i class="fas fa-home"></i>
            </Link>
            <Link className="mobile-nav-icon">
              <i class="fas fa-paper-plane"></i>
            </Link>
            <Link className="mobile-nav-icon">
              <i class="fas fa-rocket"></i>
            </Link>
            <Link className="mobile-nav-icon">
              <i class="fas fa-user"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
