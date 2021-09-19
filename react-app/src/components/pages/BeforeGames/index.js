import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { addFavoriteGame, getGame, getFavoritedGame } from "../../../utils/API";
import './BeforeGames.css';
import Navbar from "../../Navbar";
import ReactHowler from 'react-howler';


function BeforeGame() {
  const { id } = useParams();
  const [playGame, setPlayGame] = useState(false);
  const [gameInformation, setGameInformation] = useState({});
  const [favGameInformation, setFavGameInformation] = useState({});
  const [favGame, setFavGame] = useState();
  const [playMusic, setPlayMusic] = useState(false);


  useEffect(() => {
    getGame(id).then((result) => {
      console.log("game", result);
      setGameInformation(result);

    });
  }, []);
  useEffect(() => {
    getFavoritedGame(id).then((result) => {
      console.log("favgame", result);
      setFavGameInformation(result);
      console.log("fav game id", result.game_id, "game id", id)
      if (result.game_id && (result.game_id === parseInt(id))) {
        console.log("favegame id", result.game_id)
        console.log("already favorited")
        setFavGame(true);
      }
    });
  }, []);


  const onFavoriteButtonClick = (e) => {
    if (!favGame) {
      addFavoriteGame(id);
      setFavGame(true);
    }
    else {

      alert("Already added to Favorites")
    }

  };

  const onPlayButtonClick = (e) => {
    setPlayGame(true);
  };

  if (playGame) {
    let pathToRedirect = `/gamestart/${id}`;
    return <div><Redirect to={pathToRedirect} /></div>;
  }
  else {
    console.log("gameInfo", gameInformation);
    console.log("favgameInfo", favGameInformation);

    return (
      <div className="BeforeGamePage">
        <Navbar />
        <div className="BeforeGamePageContainer">
          <div className="BeforeGameRow" id="BeforeGame">
            {/* image */}
            <div className="BeforeGameScreenContainer">
              <div id="BeforeGameButtonContainer">
                <div id="BeforeGameMonitor">
                  <div id="BeforeGameMonitorContent">
                    <img id="BeforeGameScreenImg" src={`${process.env.PUBLIC_URL}/arcadescreen.png`} alt="arcade screen" />
                    <button onMouseEnter={() => setPlayMusic(true)} onMouseLeave={() => setPlayMusic(false)} onClick={onPlayButtonClick} className="BeforeGamePlayBtn">Start Game</button>
                    {playMusic ? <ReactHowler src={`${process.env.PUBLIC_URL}/Sounds/Game Entry.wav`} playing={true} /> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="BeforeGameInfoRow" id="BeforeGameInfo">
            <h2 className="BeforeGameH2">{gameInformation.name ? gameInformation.name : ""}  <button onClick={onFavoriteButtonClick} className="BeforeGameStar">{favGame ? "★" : "✩"}</button></h2>
            <h3 className="BeforeGameH3">{gameInformation.description ? gameInformation.description : ""} </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default BeforeGame;
