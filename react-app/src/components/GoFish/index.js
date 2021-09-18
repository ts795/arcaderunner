import React, { useState } from 'react';
import "./gofish.css";
import { getTopCard, insertCard, freshDeck, shuffleDeck, VALUES } from '../WarCardGame/deck';

const PLURAL_VALUES = {
    "A": "Aces",
    "2": "2s",
    "3": "3s",
    "4": "4s",
    "5": "5s",
    "6": "6s",
    "7": "7s",
    "8": "8s",
    "9": "9s",
    "10": "10s",
    "J": "Jacks",
    "Q": "Queens",
    "K": "Kings"
};

function GoFish() {
    // Stage of the game, can be:
    //    not started
    //    playing
    //    done with game
    const [gameStage, setGameStage] = useState("not started");
    const [playerCards, setPlayerCards] = useState([]);
    const [computerCards, setComputerCards] = useState([]);
    const [oceanCards, setOceanCards] = useState([]);
    const [playerBooks, setPlayerBooks] = useState([]);
    const [computerBooks, setComputerBooks] = useState([]);

    function startGame() {
        const deck = freshDeck();
        shuffleDeck(deck);
        // Give 7 cards to the computer and player
        setComputerCards(deck.slice(0, 7));
        setPlayerCards(deck.slice(7, 14));
        setOceanCards(deck.slice(14, 52));
        setGameStage("playing - player turn");
    }

    // Get a list of books to fish for
    function getPossibleBooksToFishFor() {
        let possibleBooks = [...VALUES];
        return possibleBooks;
    }

    if (gameStage.startsWith("playing")) {
        let booksInfo = <div> No completed books yet </div>;
        if (playerBooks.length + computerBooks.length > 0) {
            booksInfo = <div> {playerBooks.concat(computerBooks).join(" ")} </div>;
        }
        let playerRequest = <> </>;
        if (gameStage === "playing - player turn") {
            // Create a drop down so the user can ask for a card
            let booksCanAskFor = getPossibleBooksToFishFor();
            let optionsList = [<option value="No selection"> </option>].concat(booksCanAskFor.map((item) => <option value={item}> {PLURAL_VALUES[item]} </option>))
            playerRequest = <div> Do you have any <select>  {optionsList} </select> ? </div>
        }
        return (
            <div style={{ color: 'white' }}>
                {booksInfo}
                {playerRequest}
                <div>
                Player Cards: {JSON.stringify(playerCards)}
                </div>
                {/* <div>
                Computer Cards: {JSON.stringify(computerCards)}
                </div>
                <div>
                Ocean Cards: {JSON.stringify(oceanCards)}
                </div>
                <div>
                Player books: {JSON.stringify(playerBooks)}
                </div>
                <div>
                Computer books: {JSON.stringify(computerBooks)}
                </div> */}
            </div>
        );
    } else {
        return (
            <div onClick={startGame}>
                <img id="goFishStartImg" src={`${process.env.PUBLIC_URL}/4coloraces1.jpeg`} alt="start playing go fish" />
            </div>
        );
    }
}

export default GoFish;