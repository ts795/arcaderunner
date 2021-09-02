import React, { useState } from 'react';
import './CoinFlip.css';

function CoinFlip() {
  // flippedCoin can be flipping, not flipped, or flipped
  const [flippedCoin, setFlippedCoin] = useState("not flipped");
  const [message, setMessage] = useState("");
  const [currImg, setCurrImg] = useState("heads");

  function onFlipCoin(chosenSide) {
      setFlippedCoin("flipping");
      let coinSide = Math.random() <= 0.5 ? "tails" : "heads";
      // Let a random number less than 0.5 represent tails and one greater than 0.5 represent heads
      if (chosenSide === coinSide) {
          setMessage(`You chose ${chosenSide} and won!`);
      } else {
        setMessage(`You chose ${chosenSide} and lost!`);
      }
      let loopCnt = 0;
      let id = setInterval(function(){ 
          if (loopCnt < 50) {
            setCurrImg((prevState) => prevState === "heads" ? "tails" : "heads")
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
    return (<div className="centerDiv"><img src={currImg === "heads" ? `${process.env.PUBLIC_URL}/dollarsign.png`: `${process.env.PUBLIC_URL}/bitcoin.png`} alt="coin"/></div>);
  } 
  else {
    return (
        <div>
        <div className="centerDiv">
        <img src={currImg === "heads" ? `${process.env.PUBLIC_URL}/dollarsign.png`: `${process.env.PUBLIC_URL}/bitcoin.png`} alt="coin"/></div>
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
