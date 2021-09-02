import React, { Component} from "react";
import "./style.css";
import { randomWord } from "./words";
import step0 from "./images/0.png";
import step1 from "./images/1.png";
import step2 from "./images/2.png";
import step3 from "./images/3.png";
import step4 from "./images/4.png";
import step5 from "./images/5.png";
import step6 from "./images/6.png";
 

let gameStat;
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
    let letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  keyPress(event) {
    /**
     * 8 = backspace
     * 13 = enter
     * 32 = space
     * 65 = A (Capital)
     * 90 = Z (Capital)
     * 97 = a (Small)
     * 122 = z (Small)
     */
    if (gameStat === "YOU WON" || gameStat === "YOU LOST") {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
        this.resetButton();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
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

  endGame(outcome) {
    alert(`YOU ${outcome}`)
    return window.confirm("Would you like to play again?")
  }

  render() {
    const { mistake, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === answer;
    let guesses = this.generateLetters()
    if (isWinner) {
      if(this.endGame("WON!")) {
        this.playAgain()
      }
      
    }
    if (gameOver) {
      if(this.endGame(`LOST! The word was ${answer}`)) {
        this.playAgain()
      }
    }

    return (
      <div className="Hangman">
        <div className="guessedLetters" id="navbarText">
            <span className="guesses">
                Letters Guessed: {guesses}
            </span>
        </div>
        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          Guess the Word
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : answer}{" "}
        </p>
    </div>
    );
  }
}

export default Hangman;