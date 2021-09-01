import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { logout } from "../../utils/API";
import './style.css';

const Navbar = () => {
    const [goToGames, setGoToGames] = useState(false);
    const [goToHome, setGoToHome] = useState(false);

    const onBackButtonClick = async (e) => {
        await setGoToGames(true);
    };

    const onLogoutButtonClick = () => {
        console.log("Logout button");
        logout().then(() => setGoToHome(true));
    };

    if (goToGames) {
        let pathToRedirect = "/games";
        return <Redirect to={pathToRedirect} />;
    } else if (goToHome) {
        let pathToRedirect = "/";
        return <Redirect to={pathToRedirect} />;
    } else {
        return (
            <header>
                <div class="header-container">
                    <h1 class="neon" data-text="Arcaderunner">Arcaderunner</h1>
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
    };
}

export default Navbar;
