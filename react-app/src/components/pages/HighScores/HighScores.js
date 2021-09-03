import React, { useState, useEffect } from 'react';
import { getAllHighScores } from '../../../utils/API';
import './highscores.css';
import Navbar from "../../Navbar";

function HighScores() {
  const [highScoresData, setHighScoresData] = useState([]);


  useEffect(() => {
    getAllHighScores().then((result) => {
      console.log("ALL HIGH SCORES", getAllHighScores);
      console.log("highscore", result);
      setHighScoresData(result);
    }
    )
  }, []);


  const listItemsHighScore = highScoresData.map((score) =>
    <li key={score.id}><div>
      {score.game.name.toLowerCase() + ": " + score.score}</div><div>{score.user.username.toLowerCase()}</div></li>
  );

  return (
    <div>
      <Navbar />
      <div id="highScore" className="containerHS">
        <h3 clasName="logoHS" data-text="high scores">high scores</h3>
        <ol className="listItemsHS">
          {listItemsHighScore}
        </ol>
      </div>
    </div>
  );

}

export default HighScores;
