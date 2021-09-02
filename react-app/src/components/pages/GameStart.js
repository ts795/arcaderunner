import React, { useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import TicTacToe from "../TicTacToe";
import RockPaperScissors from "../RockPaperScissors"
import CoinFlip from "../CoinFlip";
import InvalidPage from "../InvalidPage";
import Hangman from "../Hangman";

function Games() {
    const { gameId } = useParams();
    const [goToGames, setGoToGames] = useState(false);
    const onCancelButtonClick = (e) => {
        setGoToGames(true)
    }

    if (goToGames) {
        return <Redirect to="/games" />
    } else {
        return (
            <div>
                <button onClick={onCancelButtonClick} id="cancel-btn">Cancel</button>
                <div>
                    {(gameId === "1") ? (<TicTacToe />) :
                    (gameId === "2") ? (<RockPaperScissors />) :
                    (gameId === "4") ? (<Hangman />) :
                    (gameId === "6") ? (<CoinFlip />) : <InvalidPage />

                    }
                </div>
            </div>
        )
    }
}

export default Games;