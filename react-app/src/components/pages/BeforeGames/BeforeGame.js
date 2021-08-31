import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { addFavoriteGame, logout, getGame } from "../../../utils/API";
import './BeforeGames.css';

function BeforeGame() {
  const { id } = useParams();
  const [goToGames, setGoToGames] = useState(false);
  const [goToHome, setGoToHome] = useState(false);
  const [playGame, setPlayGame] = useState(false);
  const [gameInformation, setGameInformation] = useState({});

  useEffect(() => {
    getGame(id).then((result) => {
      console.log("game", result);
      setGameInformation(result);
    });
  }, []);

  const onBackButtonClick = (e) => {
    setGoToGames(true);
  };

  const onFavoriteButtonClick = (e) => {
    console.log("Favorite");
    console.log("id", id);
    addFavoriteGame(id);
  };

  const onPlayButtonClick = (e) => {
    setPlayGame(true);
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
  } else if (playGame) {
    let pathToRedirect = "/";
    return <Redirect to={pathToRedirect} />;
  } else {
    console.log("gameInfo", gameInformation);

    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <button onClick={onBackButtonClick}>Back</button>
            <button onClick={onLogoutButtonClick}>Logout</button>
            <button onClick={onFavoriteButtonClick}>Favorite</button>
          </div>
          <div class="row">
            <button onClick={onPlayButtonClick}>Play Game</button>
          </div>
        </div>
        <div class="col">
          <textarea
            value={gameInformation.name ? gameInformation.name : ""}
            name="message"
            type="text"
            class="message"
            rows="4"
            cols="80%"
          />
          <textarea
            value={
              gameInformation.description ? gameInformation.description : ""
            }
            name="message"
            type="text"
            class="message"
            rows="4"
            cols="80%"
          />
        </div>
      </div>
    );
  }
}

export default BeforeGame;
