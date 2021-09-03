import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// Documentation https://github.com/leandrowd/react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
import './Games.css';

function Games() {
  const [goToProfile, setGoToProfile] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState("");

  const onProfileButtonClick = (e) => {
    setGoToProfile(true);
  };

  function onClickItem(currIdx, item) {
    setSelectedGameId(item.props.gameId);
  }

  if (goToProfile) {
    let pathToRedirect = "/profile";
    return <Redirect to={pathToRedirect} />
  } else if (selectedGameId) {
    let pathToRedirect = "/game/" + selectedGameId;
    return <Redirect to={pathToRedirect} />
  } else {
    return (
      <div>
        <button onClick={onProfileButtonClick} className="clickableIcon"><i class="fa fa-user fa-5x" aria-hidden="true"></i></button>
        <div className="carouselContainer">
          <Carousel width="100%" centerMode={true} onClickItem={onClickItem}>
            <div gameId="6">
              <img src={`${process.env.PUBLIC_URL}/CoinFlip.png`} />
              <p className="legend">Coin Flip</p>
            </div>
            <div gameId="1">
              <img src={`${process.env.PUBLIC_URL}/tictactoe.png`} />
              <p className="legend">Tic Tac Toe</p>
            </div>
            <div gameId="2">
              <img src={`${process.env.PUBLIC_URL}/tails.jpeg`} />
              <p className="legend">rock Paper Scissors</p>
            </div>
            <div gameId="3">
              <img src={`${process.env.PUBLIC_URL}/bitcoin.png`} />
              <p className="legend">War</p>
            </div>

          </Carousel>
        </div>
      </div>
    );
  }
}

export default Games;