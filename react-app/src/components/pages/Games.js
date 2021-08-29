import React, {useState} from "react";
import { Redirect, useParams } from 'react-router-dom'

function Games() {
  const { userId } = useParams();
  const {id} = useParams();
  const [goToProfile, setGoToProfile] = useState(false);
  const [goToGame, setGoToGame] = useState(false);

  const onProfileButtonClick = (e) => {
    setGoToProfile(true);
  };
  const onGameButtonClick = (e) => {
    setGoToGame(true);
  };

  if (goToProfile) {
    let pathToRedirect = "/profile/" + userId;
    return <Redirect to={pathToRedirect} />
  } else if(goToGame){
    let pathToRedirect = "/games/" + id;
    return <Redirect to={pathToRedirect} />
  }
  else {
    return (
      <div>
        <button onClick={onProfileButtonClick} className="clickableIcon"><i class="fa fa-user fa-5x" aria-hidden="true"></i></button>
      {/* change icon for games */}
        <button onClick={onGameButtonClick}>Game</button>
      </div>
      
    );
  }
}

export default Games;