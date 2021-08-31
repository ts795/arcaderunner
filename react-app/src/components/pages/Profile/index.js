import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { getFavoriteGames } from "../../../utils/API";
import { removeJSONWebToken } from "../../../utils/auth";
import './Profile.css';

function Profile() {
  // Get the user's information from locations
  let jwt_token = localStorage.getItem('arcadeRunnerJWTToken');
  let decoded;
  try {
    decoded = jwt_decode(jwt_token);
  } catch (err) {
    // Token will not exist when logging out
  }
  const [goToGames, setGoToGames] = useState(false);
  const [logout, setLogout] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getFavoriteGames().then((result) => {
      console.log(result);
      setData(result);
    }
    )
  }, []);

  const onGamesButtonClick = (e) => {
    setGoToGames(true);
  };

  const onLogoutClick = (e) => {
    removeJSONWebToken();
    setLogout(true);
  };

  if (goToGames) {
    let pathToRedirect = "/games";
    return <Redirect to={pathToRedirect} />
  } else if (logout) {
    let pathToRedirect = "/";
    return <Redirect to={pathToRedirect} />
  } else {
    const listItems = data.map((game) =>
      <li key={game.id}>{game.name}</li>
    );
    return (
      <div className="profilePageBody">
        <button onClick={onGamesButtonClick} className="clickableIcon backButton" id="profileBack"><i class="fa fa-arrow-left fa-3x" aria-hidden="true"></i></button>
        <button onClick={onLogoutClick} className="clickableIcon backButton" id="profileLogout"><i class="fa fa-sign-out fa-3x" aria-hidden="true"></i></button>
        <div className="profileCard">
          <h1>{decoded.username}</h1>
          <h3>{decoded.email}</h3>
          <h2>Favorite Games</h2>
          <ul className="profileFavoriteGames">
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;