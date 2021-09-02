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
        console.log("ALL HIGH SCORES", getAllHighScores);
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
      <li key={score.id}><div>
        {score.game.name + ": " + score.score}</div><div>{score.user.username}</div></li>
    );

    return (
      <div id="highScore" className="containerHS">
        <button onClick={onProfileButtonClick} className="clickableIconHS"><i class="fa fa-user fa-5x" aria-hidden="true"></i></button>
        <button onClick={onGameButtonClick} className="clickableIconHS"><i class="fa fa-user fa-5x" aria-hidden="true"></i>Game</button>
         <h3 clasName="logoHS" data-text="high scores">high scores</h3>
        <ol className="listItemsHS">
          {listItemsHighScore}
        </ol>
      </div>
    );
  }

}

export default HighScores;
