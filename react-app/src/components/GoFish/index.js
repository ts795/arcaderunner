import React, { useState } from 'react';
import "./gofish.css";
import { getTopCard, insertCard, freshDeck, shuffleDeck, VALUES } from '../WarCardGame/deck';
import jwt_decode from "jwt-decode";

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
    // Get the user's information from local storage
    let jwt_token = localStorage.getItem('arcadeRunnerJWTToken');
    let decoded;
    try {
        decoded = jwt_decode(jwt_token);
    } catch (err) {
        // Token will not exist when logging out
    }

    // Stage of the game, can be:
    //    not started
    //    playing - player turn
    //    playing - player fish
    //    playing - computer turn
    const [gameStage, setGameStage] = useState("not started");
    const [playerCards, setPlayerCards] = useState([]);
    const [computerCards, setComputerCards] = useState([]);
    const [oceanCards, setOceanCards] = useState([]);
    const [playerBooks, setPlayerBooks] = useState([]);
    const [computerBooks, setComputerBooks] = useState([]);
    // What the current player is fishing for
    const [fishingFor, setFishingFor] = useState(null);
    const [dropDownValue, setDropDownValue] = useState("No selection");

    function startGame() {
        const deck = freshDeck();
        shuffleDeck(deck);
        // Give 7 cards to the computer and player
        let computerCards = deck.slice(0, 7);
        // Check if the computer got any books on the initial deal
        let {booksFound, newListOfCards} = checkForBooks(computerCards);
        setComputerBooks(booksFound);
        setComputerCards(newListOfCards);
        // Check if the player got any books on the initial deal
        let playerCards = deck.slice(7, 14);
        let {booksFound: playerBooksFound, newListOfCards: playerNewListOfCards} = checkForBooks(playerCards);
        setPlayerBooks(playerBooksFound);
        setPlayerCards(playerNewListOfCards);
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
        let newListOfCards = listOfCards.filter(card => booksFound.indexOf(card.value) === -1);
        return {booksFound, newListOfCards};
    }

    // Get a list of books to fish for
    function getPossibleBooksToFishFor() {
        let possibleBooks = [...VALUES];
        // Filter out the player and the computer's books
        let foundBooks = [...playerBooks].concat([...computerBooks]);
        for (var idx = 0; idx < foundBooks.length; idx++) {
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
            checkForNewPlayerBooks(newPlayerCards);
            setComputerCards(newComputerCards);
        } else {
            // Player didn't get a card from the computer so they have to go fish
            setFishingFor(rankAskedFor);
            setGameStage("playing - player fish");
        }
        setDropDownValue("No selection");
    }

    // Call back when the computer has to give the player cards
    function giveComputerPlayerCards(rankComputerAskedFor, playerCardsOfRank) {
        // The player had cards of that rank so the computer gets them
        let newPlayerCards = playerCards.filter(card => card.value !== rankComputerAskedFor);
        let newComputerCards = [...computerCards, ...playerCardsOfRank];
        // Check if the computer got any books
        checkForNewComputerBooks(newComputerCards);
        setPlayerCards(newPlayerCards);
    }

    // Check for new player books after adding cards for the player
    function checkForNewPlayerBooks(newPlayerCards) {
        let {booksFound, newListOfCards} = checkForBooks(newPlayerCards);
        if (booksFound.length) {
            setPlayerBooks([...playerBooks, ...booksFound]);
        }
        setPlayerCards(newListOfCards);
    }

    // Check for new computer books after adding cards for the computer
    function checkForNewComputerBooks(newComputerCards) {
        let {booksFound, newListOfCards} = checkForBooks(newComputerCards);
        if (booksFound.length) {
            setComputerBooks([...computerBooks, ...booksFound]);
        }
        setComputerCards(newListOfCards);
    }

    // Get a card from the ocean
    function getCardFromOcean() {
        // Draw a card from the ocean
        let { card, deck } = getTopCard(oceanCards);
        // If the card matches what the player was fishing for they get another turn
        // Otherwise, it's the other player's turn
        checkForNewPlayerBooks([...playerCards, card]);
        // Update the ocean
        setOceanCards(deck);
        if (card.value === fishingFor) {
            // It remains the player's turn
            setGameStage("playing - player turn");
        } else {
            // It's the computer's turn now
            setGameStage("playing - computer turn");
        }
    }

    // Get a card from the ocean for the computer
    function computerGetsCardFromOcean(rankComputerAskedFor) {
        // Draw a card from the ocean
        let { card, deck } = getTopCard(oceanCards);
        // If the card matches what the computer was fishing for they get another turn
        // Otherwise, it's the player's turn
        checkForNewComputerBooks([...computerCards, card]);
        // Update the ocean
        setOceanCards(deck);
        if (card.value === rankComputerAskedFor) {
            // It remains the computer's turn
            setGameStage("playing - computer turn");
        } else {
            // It's the player's turn now
            setGameStage("playing - player turn");
        }
    }

    if (gameStage.startsWith("playing")) {
        if (playerBooks.length + computerBooks.length === VALUES.length) {
            // Game is done
            return (
                <div style={{ color: 'white' }}>
                    <h1> {decoded.username} {playerBooks.length > computerBooks.length ? " won" : " lost"} </h1>
                    <button onClick={startGame}>Play Again</button>
                </div>
            );
        }
        let booksInfo = <div> No completed books yet </div>;
        if (playerBooks.length + computerBooks.length > 0) {
            booksInfo = <div> {playerBooks.concat(computerBooks).join(" ")} </div>;
        }
        let playerRequest = <> </>;
        let goFishButton = <> </>;
        let computerRequest = <> </>;
        let computerActionButton = <> </>;
        if (gameStage === "playing - player turn") {
            // Create a drop down so the user can ask for a card
            let booksCanAskFor = getPossibleBooksToFishFor();
            let optionsList = [<option value="No selection"> </option>].concat(booksCanAskFor.map((item) => <option value={item}> {PLURAL_VALUES[item]} </option>))
            playerRequest = <div> Do you have any <select onChange={onPlayerSelectRankToFishFor} value={dropDownValue}>  {optionsList} </select> ? </div>
        } else if (gameStage === "playing - player fish") {
            goFishButton = <button className="goFishButton" onClick={getCardFromOcean}>Computer has no {PLURAL_VALUES[fishingFor]}. Go Fish!</button>
        } else if (gameStage === "playing - computer turn") {
            // Simulate the computer asking for a rank
            let booksCanAskFor = getPossibleBooksToFishFor();
            // Randomly select something to ask for
            let idx = Math.floor(Math.random() * booksCanAskFor.length);
            let rankComputerAskedFor = booksCanAskFor[idx];
            computerRequest = <div> {decoded.username} Do you have any {PLURAL_VALUES[rankComputerAskedFor]} ? </div>;
            // Check if the computer asked for a rank the player has
            let playerCardsOfRank = playerCards.filter(card => card.value === rankComputerAskedFor);
            if (playerCardsOfRank.length) {
                // The player has cards of the passed in rank
                computerActionButton = <button onClick={() => giveComputerPlayerCards(rankComputerAskedFor, playerCardsOfRank)}> Yes, computer I have {PLURAL_VALUES[rankComputerAskedFor]} </button>
            } else {
                // Computer has to fish
                computerActionButton = <button onClick={() => computerGetsCardFromOcean(rankComputerAskedFor)}> Sorry computer, go fish! </button>
            }
        }

        console.log("Computer Cards: ",JSON.stringify(computerCards));
        console.log("Ocean Cards: ",JSON.stringify(oceanCards));
        console.log("Player books: ",JSON.stringify(playerBooks));
        console.log("Computer books: ",JSON.stringify(computerBooks));

        return (
            <div style={{ color: 'white' }}>
                {booksInfo}
                {playerRequest}
                {computerRequest}
                {goFishButton}
                {computerActionButton}
                <div>
                    Player Cards: {JSON.stringify(playerCards)}
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