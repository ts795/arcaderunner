import React, { useState }  from 'react';
import './RockPaperScissors.css';

const RockPaperScissors = () => {
    const [gameComplete, setGameComplete] = useState(false);
    const [message, setMessage] = useState("");

    let winLossTable = {
        "rock": { "paper": false, "scissors": true },
        "paper": { "rock": true, "scissors": false },
        "scissors": { "rock": false, "paper": true }
    }

    function onSelection(selection) {
        let computerSelection;
        let randomValue = Math.random();
        console.log(randomValue);
        if (randomValue <= 0.33) {
            computerSelection = "rock";
        } else if (randomValue <= 0.67) {
            computerSelection = "paper";
        } else {
            computerSelection = "scissors";
        }
        let gameResult = winLossTable[selection][computerSelection] ? "won" : (winLossTable[selection][computerSelection] === false ? "lost" : "tied");
        setMessage(`You chose ${selection} and the computer chose ${computerSelection}. You ${gameResult}!`);
        setGameComplete(true);
    }
    if (!gameComplete) {
        return (<div className="centerDiv">
            <button type="button" className="neonBtn rockPaperScissorsBtn" onClick={() => onSelection("rock")}>
                Rock
            </button>
            <button type="button" className="neonBtn rockPaperScissorsBtn" onClick={() => onSelection("paper")}>
                Paper
            </button>
            <button type="button" className="neonBtn rockPaperScissorsBtn" onClick={() => onSelection("scissors")}>
                Scissors
            </button>
        </div>);
    } else {
        return (
            <div>
                <div className="centerDiv">
                    <button type="button" className="neonBtn rockPaperScissorsBtn" onClick={() => setGameComplete(false)}>
                        Play Again
                    </button>
                </div>
                <div className="centerDiv">
                    <p className="messageText">{message}</p>
                </div>
            </div>
        );
    }
};

export default RockPaperScissors;
