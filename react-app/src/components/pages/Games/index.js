import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// Documentation https://github.com/leandrowd/react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
import './Games.css';
import Navbar from "../../Navbar";

function Games() {
  const [selectedGameId, setSelectedGameId] = useState("");

 
  function onClickItem(currIdx, item) {
    setSelectedGameId(item.props.gameId);
  }

  if (selectedGameId) {
    let pathToRedirect = "/game/" + selectedGameId;
    return <Redirect to={pathToRedirect} />
  } else {
    return (
      <div id = "gameBackground">
        <div>
        <Navbar />
        <div className="carouselContainer">
          <Carousel width="100%" centerMode={true} onClickItem={onClickItem}>
            <div className = "gameCarouselItem" gameId="6">
              <img className="HomeImgGame" src={`${process.env.PUBLIC_URL}/CoinFlip.png`} alt="coin" />
              <p className="legend">Coin Flip</p>
            </div>
            <div className = "gameCarouselItem"  gameId="1">
              <img className="HomeImgGame" src={`${process.env.PUBLIC_URL}/tictactoe.png`} alt="tictac"/>
              <p className="legend">Tic Tac Toe</p>
            </div>
            <div className = "gameCarouselItem"  gameId="2">
              <img className="HomeImgGame" src={`${process.env.PUBLIC_URL}/rockPaperScissors.PNG`} alt="rockpaper"/>
              <p className="legend">Rock Paper Scissors</p>
            </div>
            <div className = "gameCarouselItem"  gameId="3">
              <img className="HomeImgGame" src={`${process.env.PUBLIC_URL}/war.png`} alt="war"/>
              <p className="legend">War</p>
            </div>
            <div class="main-hangman-game" gameId="4">
              <img src={`${process.env.PUBLIC_URL}/Hangman.png`} className="hangman-thumbnail HomeImgGame" alt="hangman"/>
              <p className="legend">Hangman</p>
            </div>
            <div class="main-hangman-game" gameId="5">
              <img src={`${process.env.PUBLIC_URL}/Hangman.png`} alt="GoFish"/>
              <p className="legend">GoFish</p>
            </div>

          </Carousel>
        </div>
      </div>
      <footer className = "GameFooter">
      <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
      </footer>
      </div>
    );
  }
}

export default Games;