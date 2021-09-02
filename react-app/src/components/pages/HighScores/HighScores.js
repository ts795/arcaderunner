import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import { getAllHighScores } from '../../../utils/API';
import './highscores.css';

function HighScores() {
    const { userId } = useParams();
      // Get the user's information from locations
  const [goToProfile, setGoToProfile] = useState(false);
  const [goToGame, setGoToGame] = useState(false);
  const [highScoresData, setHighScoresData] = useState([]);


    useEffect(() => {
        getAllHighScores().then((result) => {
        console.log("highscore", result);
        setHighScoresData(result);
    }
    )
  }, []);


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
    let pathToRedirect = "/game/" + 4;
    return <Redirect to={pathToRedirect} />
  } else {
        const listItemsHighScore = highScoresData.map((score) =>
      <li key={score.id}>{score.game.name + ": " + score.score}</li>
    );

    return (
      <div>
        <button onClick={onProfileButtonClick} className="clickableIcon"><i class="fa fa-user fa-5x" aria-hidden="true"></i></button>
      {/* change icon for games */}
        <button onClick={onGameButtonClick}>Game</button>
         <h2>High Scores</h2>
        <ul>
          {listItemsHighScore}
        </ul>
      </div>
      
    );
  }

}

export default HighScores;
