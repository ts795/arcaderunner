import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { addFavoriteGame, getGame, getFavoritedGame } from "../../../utils/API";
import './BeforeGames.css';


function BeforeGame() {
  const { id } = useParams();
  const [goToGames, setGoToGames] = useState(false);
  const [playGame, setPlayGame] = useState(false);
  const [gameInformation, setGameInformation] = useState({});
  const [favGameInformation, setFavGameInformation] = useState({});
  const [favGame,setFavGame] = useState();
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
      console.log("fav game id", result.game_id, "game id",id)
      if(result.game_id===id){
        console.log("favegame id",result.game_id)
        console.log("already favorited")
        setFavGame(true);}
    });
  }, []);

  const onBackButtonClick = (e) => {
    setGoToGames(true);
  };
  const onFavoriteButtonClick = (e) => {
    if(!favGame){
    addFavoriteGame(id);
    setFavGame(true);
    }
    else{

      alert("Already added to Favorites")
    }

  };

  const onPlayButtonClick = (e) => {
    setPlayGame(true);
  };

   if (playGame) {
    let pathToRedirect = `/gamestart/${id}`;
    return <div><Redirect to={pathToRedirect} /></div>;
  }   else if (goToGames) {
    let pathToRedirect = "/games";
    return <Redirect to={pathToRedirect} />;
  } 
  else {
    console.log("gameInfo", gameInformation);
    console.log("favgameInfo", favGameInformation);

    return (
   <div className = "page">
      <div className="container">
        <div className = "row" id = "game">
          {/* image */}
          <div className = "container screenImg">
          <div id="container">
          <div id="monitor">
            <div id = "monitorContent">
            <img id = "screen" src={`${process.env.PUBLIC_URL}/arcadescreen.png`} alt = "arcade screen" width = "10px" height = "100px"/>
          <button onClick={onPlayButtonClick} className = "playBtn">Start Game</button>
          </div>
          </div>
          </div>
        </div>
          </div>
          <div className = "row" id = "gameInfo">
            <h2>{gameInformation.name ? gameInformation.name : ""}  <button onClick={onFavoriteButtonClick} className = "star">{favGame ? "★" : "✩"}</button></h2>
            <h3>{gameInformation.description ? gameInformation.description : ""} </h3>
            <button onClick={onBackButtonClick}>Back</button>

            </div>
            </div>
 </div>
    );
  }
}

export default BeforeGame;
