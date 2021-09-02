import React, { useState } from "react";
import { logout } from "../../utils/API";
import './style.css';

const Navbar = () => {
    const [goToGames, setGoToGames] = useState(false);
    const [goToHome, setGoToHome] = useState(false);
    const [goToProfile, setGoToProfile] = useState(false);
    const [goToHighscores, setGoToHighscores] = useState(false);

    const onBackButtonClick = (e) => {
        setGoToGames(true);
    };

    const onProfileButtonClick = (e) => {
            setGoToProfile(true);
    };

    const onHighscoresButtonClick = (e) => {
        setGoToHighscores(true);
    };

    const onLogoutButtonClick = () => {
        console.log("Logout button");
        logout().then(() => setGoToHome(true));
    };

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
                            <p class="neon neon-link" id="profile-btn" onClick={onProfileButtonClick} data-text="Profile">Profile</p>
                        </li>
                        <li>
                            <p class="neon neon-link" id="highscores-btn" onClick={onHighscoresButtonClick} data-text="Highscores">Highscores</p>
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

export default Navbar;
