import React, { useState } from 'react';
import Deck from './deck';
import Card from './card';

function War() {
  const [start, setStart] = useState(false);
  const [inRound, setInRound] = useState(false);
  const [playerDeck, setPlayerDeck] = useState(undefined);
  const [computerDeck, setComputerDeck] = useState(undefined);


 function startGame () {
  const deck = new Deck()
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  setPlayerDeck(new Deck(deck.cards.slice(0, deckMidpoint)))
  setComputerDeck(new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)))

    console.log("started Game");
    setStart(true);

}
 if (start) {
     if (!inRound) {
        const playerCard = playerDeck.pop()
        const computerCard = computerDeck.pop()

        return <div>
            <h1>computer card</h1>
            <Card suit={computerCard.suit} value={computerCard.value}/>
            <h1>player card</h1>
            <Card suit={playerCard.suit} value={playerCard.value}/>
        </div>
     }
     return <h1>You have started the game!</h1>
 } else {
    return (
        <div>
            <button onClick={startGame}>Start</button>
        </div>
    );
 }
    
}

export default War;
