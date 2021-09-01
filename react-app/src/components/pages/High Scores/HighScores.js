import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import { getHighScores } from '../../../utils/API';
import "./HighScores.css";


function HighScores() {
    const [highScoresData, setHighScoresData] = useState([]);
    const { userId } = useParams();
      // Get the user's information from locations
  const [goToProfile, setGoToProfile] = useState(false);

  const onProfileButtonClick = (e) => {
    setGoToProfile(true);
  };

useEffect(() => {
      getHighScores().then((result) => {
      console.log("highscore", result);
      setHighScoresData(result);
   }
  )
}, []);

  if (goToProfile) {
    let pathToRedirect = "/profile/" + userId;
    return <Redirect to={pathToRedirect} />
  } else {
    const listItemsHighScore = highScoresData.map((score) =>
      <li key={score.id}>{score.game.name + ": " + score.score}</li>
    );
    return (
      <div>
        <button onClick={onProfileButtonClick} className="clickableIcon"><i class="fa fa-user fa-5x" aria-hidden="true"></i></button>
        <h2>High Scores</h2>
        <ul>
          {listItemsHighScore}
        </ul>
      </div>
    );
  }

}

export default HighScores;
