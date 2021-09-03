import { useParams } from 'react-router-dom';
import TicTacToe from "../TicTacToe";
import RockPaperScissors from "../RockPaperScissors"
import CoinFlip from "../CoinFlip";
import InvalidPage from "../InvalidPage";
import Hangman from "../Hangman";
import Navbar from "../Navbar";

function Games() {
    const { gameId } = useParams();
    return (
        <div>
            <Navbar />
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

export default Games;