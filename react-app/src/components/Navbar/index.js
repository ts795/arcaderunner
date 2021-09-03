import React, { useState } from "react";
import { logout } from "../../utils/API";
import './style.css';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [goToHome, setGoToHome] = useState(false);

    const onLogoutButtonClick = () => {
        console.log("Logout button");
        logout().then(() => setGoToHome(true));
    };

    if (goToHome) {
        return <Redirect to="/" />
    }
    return (
        <header>
            <div class="header-container">
                <Link to="/games" className="neon neon-link headerLink" id="logo-btn" data-text="Arcaderunner"> Arcaderunner </Link>
                <nav>
                    <ul>
                        <li>
                            <Link to="/games" className="neon neon-link headerLink" id="home-btn" data-text="Home"> Home </Link>
                        </li>
                        <li>
                            <Link to="/userprofile"  className="neon neon-link headerLink" id="profile-btn" data-text="Profile"> Profile </Link>
                        </li>
                        <li>
                            <Link to="/highscores"  className="neon neon-link headerLink" id="highscores-btn" data-text="Highscores"> Highscores </Link>
                        </li>
                        <li>
                            <Link  className="neon neon-link headerLink" id="logout" data-text="Logout" onClick={onLogoutButtonClick}> Logout </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
