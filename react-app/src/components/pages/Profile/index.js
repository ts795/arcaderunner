import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getFavoriteGames } from "../../../utils/API";
import './Profile.css';
import { getHighScores } from '../../../utils/API';
import Navbar from "../../Navbar";
import { Redirect } from 'react-router-dom';

function Profile() {
  // Get the user's information from locations
  let jwt_token = localStorage.getItem('arcadeRunnerJWTToken');
  let decoded;
  try {
    decoded = jwt_decode(jwt_token);
  } catch (err) {
    // Token will not exist when logging out
  }
  const [data, setData] = useState([]);
  const [highScoresData, setHighScoresData] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState("");

  useEffect(() => {
    getFavoriteGames().then((result) => {
      console.log(result);
      setData(result);
    }
    )
  }, []);

  useEffect(() => {
    getHighScores().then((result) => {
      console.log("highscore", result);
      setHighScoresData(result);
    }
    )
  }, []);

  function handleFavoriteGameClick(gameId) {
    setSelectedGameId(gameId);
  }

  const listItems = data.map((game) =>
    <li className="favoriteGameProfile" key={game.id} onClick={() => handleFavoriteGameClick(game.id)}>{game.name.toLowerCase()}</li>
  );
  const listItemsHighScore = highScoresData.map((score) =>
    <li key={score.id}>{score.game.name.toLowerCase() + ": " + score.score}</li>
  );

  if (selectedGameId) {
    let pathToRedirect = "/game/" + selectedGameId;
    return <Redirect to={pathToRedirect} />
  } else {
    return (
      <div className="profilePageBody">
        <Navbar />
        <div className="profileCard">
          <h1>{decoded.username.toLowerCase()}</h1>
          <h3>{decoded.email.toLowerCase()}</h3>
          <h2>Favorite Games</h2>
          <ul className="profileFavoriteGames">
            {listItems}
          </ul>
          <h2>High Scores</h2>
          <ul>
            {listItemsHighScore}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;