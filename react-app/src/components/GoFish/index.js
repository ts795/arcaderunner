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
    //    playing - player turn
    //    playing - player fish
    //    done with game
    const [gameStage, setGameStage] = useState("not started");
    const [playerCards, setPlayerCards] = useState([]);
    const [computerCards, setComputerCards] = useState([]);
    const [oceanCards, setOceanCards] = useState([]);
    const [playerBooks, setPlayerBooks] = useState([]);
    const [computerBooks, setComputerBooks] = useState([]);
    // What the current player is fishing for
    const [fishingFor, setFishingFor] = useState(null);

    function startGame() {
        const deck = freshDeck();
        shuffleDeck(deck);
        // Give 7 cards to the computer and player
        let computerCards = deck.slice(0, 7);
        // Check if the computer got any books on the initial deal
        let computerBooks = checkForBooks(computerCards);
        setComputerBooks(computerBooks);
        setComputerCards(computerCards);
        // Check if the player got any books on the initial deal
        let playerCards = deck.slice(7, 14);
        let playerBooks = checkForBooks(playerCards);
        setPlayerBooks(playerBooks);
        setPlayerCards(playerCards);
        setOceanCards(deck.slice(14, 52));
        setGameStage("playing - player turn");
    }

    // Check for any books in a list of cards
    // Returns a list of books found. Any cards in the book will be removed from the list
    function checkForBooks(listOfCards) {
        let countOfEachRank = {};
        for (var idx = 0; idx < listOfCards.length; idx++) {
            if (listOfCards[idx].value in countOfEachRank) {
                countOfEachRank[listOfCards[idx].value] += 1;
            } else {
                countOfEachRank[listOfCards[idx].value] = 1;
            }
        }

        let booksFound = [];
        for (const property in countOfEachRank) {
            if (countOfEachRank[property] === 4) {
                // Found a book
                booksFound.push(property);
            }
        }
        // Filter out any cards that were in a book
        for (var idx = 0; idx < booksFound.length; idx++ ) {
            let bookFound = booksFound[idx];
            listOfCards = listOfCards.filter(card => card.value !== bookFound);
        }
        return booksFound;
    }

    // Get a list of books to fish for
    function getPossibleBooksToFishFor() {
        let possibleBooks = [...VALUES];
        // Filter out the player and the computer's books
        let foundBooks = [...playerBooks].concat([...computerBooks]);
        for (var idx = 0; idx < foundBooks.length; idx++ ) {
            let bookFound = foundBooks[idx];
            possibleBooks = possibleBooks.filter(book => book !== bookFound);
        }
        return possibleBooks;
    }

    // Callback when an option is selected from the player's fishing drop down
    function onPlayerSelectRankToFishFor(event) {
        let rankAskedFor = event.target.value;
        // Check if the computer has any of the rank asked for
        let computerCardsOfRank = computerCards.filter(card => card.value === rankAskedFor);
        if (computerCardsOfRank.length) {
            // The computer had cards of that rank so the player gets them
            let newComputerCards = computerCards.filter(card => card.value !== rankAskedFor);
            let newPlayerCards = [...playerCards, ...computerCardsOfRank];
            // Check if the player got any books
            let newPlayerBooks = checkForBooks(newPlayerCards);
            if (newPlayerBooks.length) {
                setPlayerBooks([...playerBooks, ...newPlayerBooks]);
            }
            setComputerCards(newComputerCards);
            setPlayerCards(newPlayerCards);
        } else {
            // Player didn't get a card from the computer so they have to go fish
            setFishingFor(rankAskedFor);
            setGameStage("playing - player fish");
        }
    }

    // Get a card from the ocean
    function getCardFromOcean() {
        alert(fishingFor);
        // Draw a card from the ocean
        // If the card matches what the player was fishing for they get another turn
        // Otherwise, it's the other player's turn
    }

    if (gameStage.startsWith("playing")) {
        let booksInfo = <div> No completed books yet </div>;
        if (playerBooks.length + computerBooks.length > 0) {
            booksInfo = <div> {playerBooks.concat(computerBooks).join(" ")} </div>;
        }
        let playerRequest = <> </>;
        let goFishButton = <> </>
        if (gameStage === "playing - player turn") {
            // Create a drop down so the user can ask for a card
            let booksCanAskFor = getPossibleBooksToFishFor();
            let optionsList = [<option value="No selection"> </option>].concat(booksCanAskFor.map((item) => <option value={item}> {PLURAL_VALUES[item]} </option>))
            playerRequest = <div> Do you have any <select onChange={onPlayerSelectRankToFishFor}>  {optionsList} </select> ? </div>
        } else if (gameStage === "playing - player fish") {
            goFishButton = <button onClick={getCardFromOcean}>Computer has no {PLURAL_VALUES[fishingFor]}. Go Fish!</button>
        }
        return (
            <div style={{ color: 'white' }}>
                {booksInfo}
                {playerRequest}
                {goFishButton}
                <div>
                Player Cards: {JSON.stringify(playerCards)}
                </div>
                <div>
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
                </div>
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