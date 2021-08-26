import React, {useState} from "react";
import { Redirect, useParams } from 'react-router-dom'

function Profile() {
  const { userId } = useParams();
  const [goToGames, setGoToGames] = useState(false);

  const onGamesButtonClick = (e) => {
    setGoToGames(true);
  };

  if (goToGames) {
    let pathToRedirect = "/games/" + userId;
    return <Redirect to={pathToRedirect} />
  } else {
    return (
      <div>
        <button onClick={onGamesButtonClick} className="clickableIcon"><i class="fa fa-arrow-left fa-5x" aria-hidden="true"></i></button>
      </div>
    );
  }
}

export default Profile;