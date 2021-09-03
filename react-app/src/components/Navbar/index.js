import React, { useState } from "react";
import { logout } from "../../utils/API";
import { Redirect } from "react-router";
import './style.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [goToHome, setGoToHome] = useState(false);

    const onLogoutButtonClick = () => {
        console.log("Logout button");
        logout().then(() => setGoToHome(true));
    };

    if (goToHome) {
        return <Redirect to="/" />
    } else {
        return (
            <header className="main-navbar">
                <div className="main-header-container">
                    <div className="main-logo-container">
                    <Link to="/games" className="main-nav-neon main-nav-logo big-nav-logo" id="logo-btn" data-text="Arcaderunner">Arcaderunner</Link>
                    <Link to="/games" className="main-nav-neon main-nav-logo small-nav-logo" id="logo-btn" data-text="B">B</Link>
                    </div>
                    <nav className="main-nav-links">
                        <ul className="main-nav-links-list">
                            <li className="main-nav-link-items">
                                <Link to="/games" className=" nav-link" id="main-home-btn"> Home </Link>
                            </li>
                            <li className="main-nav-link-items">
                                <Link to="/userprofile"  className=" nav-link" id="main-profile-btn"> Profile </Link>
                            </li>
                            <li className="main-nav-link-items">
                                <Link to="/highscores"  className=" nav-link" id="main-highscores-btn"> Highscores </Link>
                            </li>
                            <li className="main-nav-link-items">
                                <Link  className=" nav-link" id="main-logout-btn" onClick={onLogoutButtonClick}> Logout </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;
