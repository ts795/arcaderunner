import React, { useState } from 'react';
import Deck from './deck';
import Card from './card';
import { getTopCard, insertCard, freshDeck, shuffleDeck } from './deck';

function War() {
  const [start, setStart] = useState(false);
  const [inRound, setInRound] = useState(false);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [compFlipped, setCompFlipped] = useState(null);
  const [playerFlipped, setPlayerFlipped] = useState(null);


    function startGame () {
        const deck = freshDeck()
        shuffleDeck(deck)
        const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
        setPlayerDeck(deck.slice(0, deckMidpoint))
        setComputerDeck(deck.slice(deckMidpoint, deck.numberOfCards))
        console.log("started Game");
        setStart(true);


    }

    function updateDeck() {
        if(compFlipped > playerFlipped) {
            let newCompDeck = insertCard(computerDeck, compFlipped)
            newCompDeck = insertCard(newCompDeck, playerFlipped)
            setComputerDeck(newCompDeck)
        } else if (playerFlipped > compFlipped) {
            let newPlayerDeck = insertCard(playerDeck, playerFlipped)
            newPlayerDeck = insertCard(newPlayerDeck, compFlipped)
            setPlayerDeck(newPlayerDeck)
        } else {
            setComputerDeck(insertCard(computerDeck, compFlipped))
            setPlayerDeck(insertCard(playerDeck, playerFlipped))
        }
    }

    function clearCards() {
        if(compFlipped !== null && playerFlipped !== null) {
            updateDeck()
        }
    }

 if (start) {
     if (!inRound) {
        clearCards()
        const { card: playerCard, deck: newPlayerDeck } = getTopCard(playerDeck)
        const computerCard = computerDeck.pop()

        return <div>
            <h1>computer card</h1>
            <Card suit={computerCard.suit} value={computerCard.value}/>
            <h1>player card</h1>
            <Card suit={playerCard.suit} value={playerCard.value}/>
        </div>
     } else {
        return (
        <div>
            <button onClick={startGame}>Start</button>
        </div> 
        )
     }
 } else {
    return (
        <div>
            <button onClick={startGame}>Start</button>
        </div>
    );
 }
    
}

export default War;
