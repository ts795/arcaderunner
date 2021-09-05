import React, { Component} from "react";
import ReactHowler from "react-howler";
import "./style.css";
import { randomWord } from "./words";
import { addHighscore } from '../../utils/API';
import step0 from "./images/0.png";
import step1 from "./images/1.png";
import step2 from "./images/2.png";
import step3 from "./images/3.png";
import step4 from "./images/4.png";
import step5 from "./images/5.png";
import step6 from "./images/6.png";
let letter

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };
  
  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
      gameEnd: false,
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.keyPress = this.keyPress.bind(this);
    window.addEventListener("keydown", this.keyPress);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((bingo) => (this.state.guessed.has(bingo) ? bingo : "_"));
  }

  handleGuess(value) {
    letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  keyPress(event) {
     if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
      this.handleGuess(event.key);
    } else {
    }
  }

  generateLetters() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <p
        key={letter}
        value={letter}
        className={!this.state.guessed.has(letter) ? "hidden" : "guessedLetters"}
      >
          {letter}
      </p>
    ));
  }

  playAgain = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };

  render() {
    const gameId = window.location.href.split("/")[window.location.href.split("/").length - 1]
    const { mistake, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === answer;
    let gameResult = isWinner ? "WON" : "LOST"
    let guesses = this.generateLetters()

    const checkCorrect = () => {
      if(this.state.answer.split("").includes(letter)) {
        return true
      } else {
        return false
      }
    }

    console.log(answer)

    if(isWinner) {
      addHighscore(gameId, 100)
    }

    if (gameOver || isWinner) {
      return (
        <div>
          <ReactHowler
          src={isWinner ? `${process.env.PUBLIC_URL}/Sounds/Win.wav` : `${process.env.PUBLIC_URL}/Sounds/Loose.wav`}
          playing={true}
           />
            <div className="centerDiv">
                <button type="button" className="neonBtn hangmanPlayAgainBtn" onClick={this.playAgain}>
                    Play Again
                </button>
            </div>
            <div className="centerDiv msgDiv">
                <p className="messageText">{`You ${gameResult}! The word was ${answer}`}</p>
            </div>
        </div>
    );
    } else {
      return (
        <div className="Hangman">
           <ReactHowler
          src={`${process.env.PUBLIC_URL}/Sounds/Confirm.wav`}
          playing={checkCorrect()}
           />
          <div className="guessedLetters text-light" id="navbarText">
              <span className="guesses">
                  Letters Guessed: {guesses}
              </span>
          </div>
          <p className="text-center">
            <img src={images[mistake]} className="Hangman-img" alt={altText} />
          </p>
          <p className="text-center text-light">
            Guess the Word
          </p>
          <p className="Hangman-word text-light text-center">
            {!gameOver ? this.guessedWord() : answer}{" "}
          </p>
      </div>
      );
    }
  }
}

export default Hangman;