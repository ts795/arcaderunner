import React, { useState } from 'react';
import './CoinFlip.css';
import ReactHowler from 'react-howler';

function CoinFlip() {
  // flippedCoin can be flipping, not flipped, or flipped
  const [flippedCoin, setFlippedCoin] = useState("not flipped");
  const [message, setMessage] = useState("");
  const [currImg, setCurrImg] = useState("DollarSign");
  const [wonGame, setWonGame] = useState(false);

  function onFlipCoin(chosenSide) {
      let coinSide = Math.random() <= 0.5 ? "DollarSign" : "Bitcoin";
      // Let a random number less than 0.5 represent Dollar sign and one greater than 0.5 represent Bitcoin
      if (chosenSide === coinSide) {
          setMessage(`You chose ${chosenSide} and won!`);
          setWonGame(true);
      } else {
        setMessage(`You chose ${chosenSide} and lost!`);
        setWonGame(false);
      }
      setFlippedCoin("flipping");
      let loopCnt = 0;
      let id = setInterval(function(){ 
          if (loopCnt < 35) {
            setCurrImg((prevState) => prevState === "Bitcoin" ? "DollarSign" : "Bitcoin")
          } else {
            clearInterval(id);
            setCurrImg(coinSide);
            setFlippedCoin("flipped");
          }
          loopCnt++;
         },
      100);
  }

  if (flippedCoin === "not flipped") {
    return (<div className="centerDiv">
        <button type="button" className="neonBtn coinFlipBtn" onClick={() => onFlipCoin("DollarSign")}>
          <i className="fas fa-usd-circle coin" ></i>
        </button>
        <button type="button" className="neonBtn coinFlipBtn" onClick={() => onFlipCoin("Bitcoin")}>
          <i className="fab fa-bitcoin coin" ></i>
        </button>
    </div>);
  } else if (flippedCoin === "flipping") {
    return (<div className="centerDiv">
      <ReactHowler
        src={wonGame? `${process.env.PUBLIC_URL}/Sounds/Coin_Win.wav` : `${process.env.PUBLIC_URL}/Sounds/Coin_Loose.wav`}
        playing={true}
      />
      <img className="coinImage" src={currImg === "DollarSign" ? `${process.env.PUBLIC_URL}/dollarsign.png`: `${process.env.PUBLIC_URL}/bitcoin.png`} alt="coin"/>
      </div>);
  } 
  else {
    return (
        <div>
        <div className="centerDiv">
        <img className="coinImage" src={currImg === "DollarSign" ? `${process.env.PUBLIC_URL}/dollarsign.png`: `${process.env.PUBLIC_URL}/bitcoin.png`} alt="coin"/></div>
        <div className="centerDiv">
            <button type="button" className="neonBtn coinFlipBtn" onClick={() => setFlippedCoin("not flipped")}>
            Play Again
            </button>
        </div>
        <div className="centerDiv">
            <p className="messageText">{ message }</p>
        </div>
        </div>
    );
  }
}

export default CoinFlip;
