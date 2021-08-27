import React, {useState} from "react";
import { Redirect, useParams } from 'react-router-dom'

function Games() {
  const { userId } = useParams();
  const [goToProfile, setGoToProfile] = useState(false);

  const onProfileButtonClick = (e) => {
    setGoToProfile(true);
  };

  if (goToProfile) {
    let pathToRedirect = "/profile/" + userId;
    return <Redirect to={pathToRedirect} />
  } else {
    return (
      <div>
        <button onClick={onProfileButtonClick} className="clickableIcon"><i class="fa fa-user fa-5x" aria-hidden="true"></i></button>
      </div>
    );
  }
}

export default Games;