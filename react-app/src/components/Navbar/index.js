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
            <header>
                <div class="header-container">
                    <Link to="/games" className="neon logo" id="logo-btn" data-text="Arcaderunner"> Arcaderunner </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/games" className="neon nav-link" id="home-btn" data-text="Home"> Home </Link>
                            </li>
                            <li>
                                <Link to="/userprofile"  className="neon nav-link" id="profile-btn" data-text="Profile"> Profile </Link>
                            </li>
                            <li>
                                <Link to="/highscores"  className="neon nav-link" id="highscores-btn" data-text="Highscores"> Highscores </Link>
                            </li>
                            <li>
                                <Link  className="neon nav-link" id="logout" data-text="Logout" onClick={onLogoutButtonClick}> Logout </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;
