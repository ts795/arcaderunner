import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import TicTacToe from "../../TicTacToe";
import RockPaperScissors from "../../RockPaperScissors"
import CoinFlip from "../../CoinFlip";
import InvalidPage from "../../InvalidPage";
import Hangman from "../../Hangman"
import War from '../../WarCardGame'
import "./GameStart.css";

function GameStart() {
  const { gameId } = useParams();
  const [goToGames, setGoToGames] = useState(false);
  const onCancelButtonClick = (e) => {
    setGoToGames(true);
  };

  if (goToGames) {
    return <Redirect to="/games" />;
  } else {
    return (
      <div className="gamePage">
        <button onClick={onCancelButtonClick} id="cancel-btn">
          Cancel
        </button>
        {/* <div className="currentGame"> */}
          <div id="gameContainer">
            <div id="gameMonitor">
              <div className="currentGame">

              {gameId === "1" ? (
                <TicTacToe />
              ) : gameId === "2" ? (
                <RockPaperScissors />
              ) : gameId === "6" ? (
                <CoinFlip />
              ) : gameId === "4" ? (
                <Hangman />
              ): (
                <InvalidPage />
              )}
            </div>
          </div>
        </div>
        </div>
    
    );
  }
}

export default GameStart;
