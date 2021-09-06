import React, { Component, useState } from 'react';
import './style.css';
import ReactHowler from 'react-howler';


function TicTacToe() {

    function Square(props) {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }

    class Board extends Component {
        renderSquare(i) {
            return (
                <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />
            );
        }

        render() {
            return (
                <div>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            );
        }
    }

    class Game extends Component {
        initState(){
                this.setState( {
                history: [
                    {
                        squares: Array(9).fill(null)
                    }
                ],
                stepNumber: 0,
                xIsNext: true,
                gameProgress: true,
            });

        };
        constructor(props) {
            super(props);
                this.state = {
                history: [
                    {
                        squares: Array(9).fill(null)
                    }
                ],
                stepNumber: 0,
                xIsNext: true,
                gameProgress: true,
            };

            console.log("STATE===", this.state);
        };
        
        handleClick(i) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? "X" : "O";
               console.log("winner squares", calculateWinner(squares));
            this.setState({
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
                gameProgress: calculateWinner(squares) === null,
            });
        }

        jumpTo(step) {
            console.log(`jumpTo(${step})`);
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0
            });
        }

        render() {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);

            const moves = history.map((step, move) => {
                console.log(`move ${move}`);
                const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            });

            let status;
            if (this.state.stepNumber === 9) {
                status = "Draw";
            } else if (winner){
                status = "Winner: " + winner;
            } else {
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            } 
            console.log(this.state.xIsNext)
             console.log("gameProgress....", this.state.gameProgress);
            if(!this.state.gameProgress || (this.state.stepNumber === 9)) {
                return (
                <div className="centerDiv">
                    <div className="statusTicTac">
                        <h5 className="gameOverTicTac">GAME OVER</h5> 
                        <p>{status}</p>
                    </div>
                    <button type="button" className="neonBtn playAgainBtn" onClick={() => this.initState()}>
                        Play Again
                    </button>
                </div>
                )
                
            } else {
            return (
                <div className="game">
                    <ReactHowler
                        src={this.state.xIsNext ? `${process.env.PUBLIC_URL}/Sounds/Tic.wav` : `${process.env.PUBLIC_URL}/Sounds/Tac.wav`}
                        playing={this.state.stepNumber > 0}
                    />
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div className="ticTacToeStatus">{status}</div>
                        <ol className="ticTacToeMovesList">{moves}</ol>
                    </div>
                </div>
            );
        }
    }
}
    console.log("IN");
    return (<Game />);
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log("winner=====", squares[a]);
            return squares[a];
        }
    }
    return null;
}


export default TicTacToe;
