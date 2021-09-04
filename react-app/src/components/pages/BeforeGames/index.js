import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { addFavoriteGame, getGame, getFavoritedGame } from "../../../utils/API";
import './BeforeGames.css';
import Navbar from "../../Navbar";

function BeforeGame() {
  const { id } = useParams();
  const [playGame, setPlayGame] = useState(false);
  const [gameInformation, setGameInformation] = useState({});
  const [favGameInformation, setFavGameInformation] = useState({});
  const [favGame,setFavGame] = useState();
  const [star, setStar] = useState("✩");
  useEffect(() => {
    getGame(id).then((result) => {
      console.log("game", result);
      setGameInformation(result);

    }
    );
  }, []);
  useEffect(() => {
    getFavoritedGame(id).then((result) => {
      console.log("favgame", result);
      setFavGameInformation(result);
      console.log("fav game id", result.game_id, "game id",id)
    });
  }, []);


  const onFavoriteButtonClick = (e) => {
 if(!favGame){
    addFavoriteGame(id);
    setFavGame(true);
    setStar("★")
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
  } 
  else {
    console.log("gameInfo", gameInformation);
    console.log("favgameInfo", favGameInformation.game_id);
    function checkFavGame(){
      console.log("gameInfo2222222", gameInformation);
    console.log("favgameInfo222222", favGameInformation.game_id);
      if(favGameInformation.game_id===id){
        console.log("star")
        setStar("★");
        setFavGame(true);
      }
    };
    checkFavGame();
    return (
   <div className = "BeforeGamePage">
      <Navbar/>
      <div className="BeforeGamePageContainer">
        <div className = "BeforeGameRow" id = "BeforeGame">
          {/* image */}
          <div className = "BeforeGameScreenContainer">
          <div id="BeforeGameButtonContainer">
          <div id="BeforeGameMonitor">
            <div id = "BeforeGameMonitorContent">
            <img id = "BeforeGameScreenImg" src={`${process.env.PUBLIC_URL}/arcadescreen.png`} alt = "arcade screen"/>
          <button onClick={onPlayButtonClick} className = "BeforeGamePlayBtn">Start Game</button>
          </div>
          </div>
          </div>
        </div>
          </div>
          <div className = "BeforeGameInfoRow" id = "BeforeGameInfo">
            <h2 className = "BeforeGameH2">{gameInformation.name ? gameInformation.name : ""}  <button onClick={onFavoriteButtonClick} className = "BeforeGameStar">{star}</button></h2>
            <h3 className = "BeforeGameH3">{gameInformation.description ? gameInformation.description : ""} </h3>
            </div>
            </div>
 </div>
    );
  }
}

export default BeforeGame;
