import React, { useState } from 'react';
import Deck from './deck';
import Card from './card';
import { getTopCard, insertCard, freshDeck, shuffleDeck,cardValues } from './deck';
import "./war.css";

function War() {
  const [start, setStart] = useState(false);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [doneWithGame, setDoneWithGame] = useState(false);


    function startGame () {
        const deck = freshDeck()
        shuffleDeck(deck)
        const deckMidpoint = Math.ceil(deck.length / 2)
        // setPlayerDeck(deck.slice(0, deckMidpoint))
        // setComputerDeck(deck.slice(deckMidpoint, deck.length))
        setPlayerDeck(deck.slice(0, 3))
        setComputerDeck(deck.slice(3, 6))
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
            <h1 className = "warWinner">Winner:{playerDeck.length >0 ? "Player":"Computer"}</h1>
            
            <button onClick={startGame}>Play Again</button>

        </div>
    }else if (start && playerDeck.length >0&& computerDeck.length>0) {
    
        // clearCards()
        // console.log("****Player Deck***", playerDeck);
        // console.log("****Computer Deck****", computerDeck);
        const { card: playerCard, deck: newPlayerDeck } = getTopCard(playerDeck);
        const { card: computerCard, deck: newComputerDeck } = getTopCard(computerDeck)
        console.log("Player Card", playerCard);
        console.log("Computer Card", computerCard);


        return <div className = "warCards">
            <h1  className = "warCards">computer card</h1>
            <div  className = "warCards">suit={computerCard.suit} value={computerCard.value}</div> 
            <h1  className = "warCards">player card</h1>
            <div  className = "warCards">suit={playerCard.suit} value={playerCard.value}</div> 
            <button onClick = {()=>updateDeck(playerCard,computerCard,newPlayerDeck, newComputerDeck)}>Next</button>

        </div>
    
 } else {
    return (
        <div>
            <button onClick={startGame}>Start</button>
        </div>
    );
 }
    
}

export default War;
