import React, { useState } from "react";
import { logout } from "../../utils/API";
import { Redirect } from "react-router";
import './style.css';
import "../pages/GameStart"

const Navbar = () => {
    const [goToGames, setGoToGames] = useState(false)
    const [goToHome, setGoToHome] = useState(false);
    const onLogoutButtonClick = () => {
        console.log("Logout button");
        logout().then(() => setGoToHome(true));
    };

    const onBackButtonClick = () => {
       setGoToGames(true)
    }

    if (goToHome) {
        let pathToRedirect = "/";
        return <Redirect to={pathToRedirect} />;
    } else {
        return (
            <header>
                <div class="header-container">
                    <a class="logo" href="#top"><h1 class="neon" id="logo-btn" data-text="Arcaderunner">Arcaderunner</h1></a>
                    <nav>
                        <ul>
                            <li>
                                <p class="neon neon-link" id="home-btn" onClick={onBackButtonClick} data-text="Home">Home</p>
                            </li>
                            <li>
                                <p class="neon neon-link" id="profile-btn" data-text="Profile">Profile</p>
                            </li>
                            <li>
                                <p class="neon neon-link" id="highscores-btn" data-text="Highscores">Highscores</p>
                            </li>
                            <li>
                                <p class="neon neon-link" id="logout" onClick={onLogoutButtonClick} data-text="Logout">Logout</p>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;
