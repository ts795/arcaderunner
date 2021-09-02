import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { addFavoriteGame, getGame } from "../../../utils/API";
import './BeforeGames.css';


function BeforeGame() {
  const { id } = useParams();
  const [goToGames, setGoToGames] = useState(false);
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
    document.getElementById("monitor").innerHTML = "Hello";
    setPlayGame(true);
  };

   if (playGame) {
     console.log("hello")
    // let pathToRedirect = `/gamestart/${id}`;
    // return <div><Redirect to={pathToRedirect} /></div>;
  }   else if (goToGames) {
    let pathToRedirect = "/games";
    return <Redirect to={pathToRedirect} />;
  } 
  else {
    console.log("gameInfo", gameInformation);

    return (
   <div className = "page">
      <div className="container">
        <div className = "row" id = "game">
          {/* image */}
          <div className = "container screenImg">
          <div id="container">
          <div id="monitor">
            <img id = "screen" src={`${process.env.PUBLIC_URL}/arcadescreen.png`} alt = "arcade screen" width = "10px" height = "100px"/>
          <button onClick={onPlayButtonClick} className = "playBtn">Start Game</button>
          </div>
          </div>
        </div>
          </div>
          <div className = "row" id = "gameInfo">
            <h2>{gameInformation.name ? gameInformation.name : ""}  <button onClick={onFavoriteButtonClick} className = "star">✩</button></h2>
            <h3>{gameInformation.description ? gameInformation.description : ""} </h3>
            <button onClick={onBackButtonClick}>Back</button>

            </div>
            </div>
 </div>
    );
  }
}

export default BeforeGame;
