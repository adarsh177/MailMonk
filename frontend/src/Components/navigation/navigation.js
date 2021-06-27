import React, { useState } from "react";
import logo from "../../media/logo.png";
import "./scss/navigation.scss";
import { Link, NavLink } from "react-router-dom";
import firebase from "firebase";

async function logoutUser(history) {
    await firebase.auth().signOut();
    history.push("/");
}

export const Navigation = (props) => {
    const [slide, setSlide] = useState("burger");
    const showSlide = () => {
        setSlide("cross");
    };
    const hideSlide = () => {
        setSlide("burger");
    };
    const [Indexing, setIndexing] = useState(1);

    return (
        <>
            <div className={`navigation ${slide}-navigation`}>
                <div
                    className={`nav-hamburger ${slide}-hide-burger`}
                    onClick={showSlide}
                >
                    <i class="fas fa-bars"></i>
                </div>
                <div
                    className={`nav-cross ${slide}-hide-cross`}
                    onClick={hideSlide}
                >
                    <i class="fas fa-times"></i>
                </div>
                <div className={`nav-logo ${slide}-nav-logo`}>
                    <img src={logo} alt="Logo" />
                </div>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/dashboard"
                >
                    <div className="nav-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Home
                    </div>
                </NavLink>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/history"
                >
                    <div className="nav-icon">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Mail History
                    </div>
                </NavLink>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/campaign"
                >
                    <div className="nav-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Campaigns
                    </div>
                </NavLink>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/contacts"
                >
                    <div className="nav-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Contacts
                    </div>
                </NavLink>
                <div
                    className="nav-logout"
                    onClick={() => logoutUser(props.routerHistory)}
                >
                    <div className="nav-icon">
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item`}>
                        Log Out
                    </div>
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
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/dashboard"
                        >
                            <i class="fas fa-home"></i>
                        </NavLink>
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/history"
                        >
                            <i class="fas fa-paper-plane"></i>
                        </NavLink>
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/campaign"
                        >
                            <i class="fas fa-rocket"></i>
                        </NavLink>
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/contacts"
                        >
                            <i class="fas fa-user"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};
