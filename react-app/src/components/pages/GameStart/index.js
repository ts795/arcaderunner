import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import TicTacToe from "../../TicTacToe";
import RockPaperScissors from "../../RockPaperScissors";
import CoinFlip from "../../CoinFlip";
import InvalidPage from "../../InvalidPage";
import Hangman from "../../Hangman";
import War from "../../WarCardGame";
import "./GameStart.css";
import { getGame } from "../../../utils/API";
import Navbar from "../../Navbar";

function GameStart() {
  const { gameId } = useParams();
  const [gameInformation, setGameInformation] = useState({});

  useEffect(() => {
    getGame(gameId).then((result) => {
      console.log("game", result);
      setGameInformation(result);
    });
  }, []);

  return (
    <div className="gamePage">
      <Navbar />
      <h1 className="GameStartNameRow">Now Playing: {gameInformation.name}</h1>
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
            ) : (
              <InvalidPage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameStart;
