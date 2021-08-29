//back button
//<Route exact path="/games/:userId" component={Games} />
//logout button
//<Route exact path="/" component={Home} />
//favorite button
//add to favorite
//play button
//go to game after start page
//Display name
//get from api
//Display description
//get from api
import React, {useState} from "react";
import { Redirect, useParams } from 'react-router-dom'

function BeforeGame() {
  const { userId } = useParams();
  const [goToGames, setGoToGames] = useState(false);
  const [goToHome, setGoToHome] = useState(false);
  const [playGame, setPlayGame] = useState(false);
  const onBackButtonClick = (e) => {
    setGoToGames(true);
  };
  const onLogoutButtonClick = (e) => {
    setGoToHome(true);
  };
  const onFavoriteButtonClick = (e) => {
    console.log("Favorite");
  };
  const onPlayButtonClick = (e) => {
    setPlayGame(true);
  };
  if (goToGames) {
    //does not work
    let pathToRedirect = "/games/" + userId;
    return <Redirect to={pathToRedirect} />
  }else if(goToHome){
    //this works!
    let pathToRedirect = "/";
    return <Redirect to={pathToRedirect} />

  }else if(playGame){
    //redirect to game start page
    let pathToRedirect = "/";
    return <Redirect to={pathToRedirect} />

  }else{
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
    </div>
  );
}
}

export default BeforeGame;
