import React, { useState } from 'react';
import Deck, { getColor } from './deck';
import Card from './card';
import { getTopCard, insertCard, freshDeck, shuffleDeck,cardValues } from './deck';
import './war.css';
import ReactHowler from 'react-howler';


function War() {
  const [start, setStart] = useState(false);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [doneWithGame, setDoneWithGame] = useState(false);
  const [winGame, setWinGame] = useState(false);



    function startGame () {
        const deck = freshDeck()
        shuffleDeck(deck)
        const deckMidpoint = Math.ceil(deck.length / 2)
        setPlayerDeck(deck.slice(0, deckMidpoint))
        setComputerDeck(deck.slice(deckMidpoint, deck.length))
        // setPlayerDeck(deck.slice(0, 3))
        // setComputerDeck(deck.slice(3, 6))
        console.log("started Game");
        setStart(true);
        setDoneWithGame(false);


    }

    function updateDeck(pCard,compCard,newPDeck, newCompDeck) {
        let compCardNumericValue = cardValues[compCard.value];
        let playerCardNumericValue = cardValues[pCard.value];
        let updatedCompDeck = newCompDeck, updatedPlayerDeck = newPDeck;

        if(compCardNumericValue > playerCardNumericValue) {
            console.log("Computer Card is Bigger");
            updatedCompDeck= insertCard(newCompDeck, compCard)
            updatedCompDeck = insertCard(updatedCompDeck, pCard)
           
        } else if (playerCardNumericValue > compCardNumericValue) {
            updatedPlayerDeck = insertCard(newPDeck, pCard)
            updatedPlayerDeck = insertCard(updatedPlayerDeck, compCard);
        } else {
            console.log("Cards are equal");
            updatedCompDeck = insertCard(newCompDeck, compCard)
            updatedPlayerDeck = insertCard(newPDeck, pCard)
        }
        if(updatedPlayerDeck.length ===0|| updatedCompDeck.length===0){
            setDoneWithGame(true);
            setWinGame(true);
        }
        setComputerDeck(updatedCompDeck)
        setPlayerDeck(updatedPlayerDeck);
    }
    // console.log("PLAYER DECK",playerDeck);
    // console.log("COMPUTER DECK",computerDeck);
    console.log("PLAYER DECK",JSON.stringify(playerDeck));
    console.log("COMPUTER DECK",JSON.stringify(computerDeck));
    if(doneWithGame){
        return <div>
            <div className = "warWinner">{playerDeck.length >0 ? "You WON!":"You LOST to the Computer!"}</div>
            <ReactHowler
        src={winGame? `${process.env.PUBLIC_URL}/Sounds/Win.wav` : `${process.env.PUBLIC_URL}/Sounds/Loose.wav`}
        playing={true}
      />
            <button className="neonBtn hangmanPlayAgainBtn" onClick={startGame}>Play Again</button>

        </div>
    }else if (start && playerDeck.length >0&& computerDeck.length>0) {
    
        // clearCards()
        console.log("****Player Deck***", playerDeck);
        // console.log("****Computer Deck****", computerDeck);
        const { card: playerCard, deck: newPlayerDeck } = getTopCard(playerDeck);
        const { card: computerCard, deck: newComputerDeck } = getTopCard(computerDeck)
        console.log("Player Card", playerCard);
        console.log("Computer Card", computerCard);

            console.log("LENGTH===", playerDeck);
            console.log("NewPLAYER", newPlayerDeck.length +1);
            console.log("NewCOMP", newComputerDeck.length +1);
    console.log("PLAYER DECK",JSON.stringify(playerDeck));
        return <div className = "warCardsContain" onClick = {()=>updateDeck(playerCard,computerCard,newPlayerDeck, newComputerDeck)}>
            <div  className = "warCardsTitle">Computer {newComputerDeck.length +1}</div>
            <div className="bothCards">
            <div className = "warCardsOutline ">
            <div className={getColor(computerCard.suit) === "red" ? "warCardsTop red" : "warCardsTop black"}><span>{computerCard.value}</span><span>{computerCard.suit}</span></div> 
            <div className={getColor(computerCard.suit) === "red" ? "warCardsSuit red" : "warCardsSuit black"}>{computerCard.suit}</div>
            <div className={getColor(computerCard.suit) === "red" ? "warCardsBottom red" : "warCardsBottom black"}><span>{computerCard.suit}</span><span>{computerCard.value}</span></div>
            </div>
            <div  className = "warCardsTitle">Player {newPlayerDeck.length +1}</div>
            <div className = "warCardsOutline">
            <div className={getColor(playerCard.suit) === "red" ? "warCardsTop red" : "warCardsTop black"}><span>{playerCard.value}</span><span>{playerCard.suit}</span></div> 
            <div className={getColor(playerCard.suit) === "red" ? "warCardsSuit red" : "warCardsSuit black"}>{playerCard.suit}</div>
            <div className={getColor(playerCard.suit) === "red" ? "warCardsBottom red" : "warCardsBottom black"}><span>{playerCard.suit}</span><span>{playerCard.value}</span></div>
            </div>
            </div>
        </div>
    
 } else {
    return (
        <div className = "warCardsContainStart" onClick={startGame}>
            <img id = "warGameStartImg" src={`${process.env.PUBLIC_URL}/warstart.png`} alt = "war start screen"/>
            {/* <div  className = "warCardsTitle"></div>
            <div className = "warCardsOutline ">
            <div className="warCardsTop"><span></span></div> 
            <div className="warCardsSuit"></div>
            <div className="warCardsBottom"><span></span></div>
            </div>
            <div className = "warCardsOutline">
            <div className="warCardsTop"><span></span></div> 
            <div className="warCardsSuit"></div>
            <div className="warCardsBottom"><span></span></div>
            </div> */}
        </div>
        
    );
 }
    
}

export default War;
