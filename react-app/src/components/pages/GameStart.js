import React, { useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import TicTacToe from "../TicTacToe";
import RockPaperScissors from "../RockPaperScissors"

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
                    {gameId === "TicTacToe" ? (
                        <TicTacToe />
                    ) : (
                        <div>
                            <RockPaperScissors />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Games;