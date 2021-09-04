import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { loggedIn } from "../../../utils/auth";
import './Home.css';
import ReactHowler from 'react-howler';

function Home() {
  const [userisLoggedIn, setLoggedIn] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [makeSoundPlay, setMakeSoundPlay] = useState('/Sounds/LogIn.wav');

  function onClick(loggingIn) {
    if (loggingIn) {
      setMakeSoundPlay('/Sounds/LogIn.wav')
    } else {
      setMakeSoundPlay("/Sounds/SignUp.wav")
    }
    setPlaySound(true)
  }

  if (!userisLoggedIn && loggedIn()) {
    console.log("User already logged in");
    setLoggedIn(true);
  }

  if (userisLoggedIn) {
    console.log("Redirecting to /games");
    let pathToRedirect = "/games";
    return <Redirect to={pathToRedirect} />
  } else {
console.log("play sound", playSound);
    return (
      <section className="HomePageSection">
        <div className="HomePageContainerMain">
          <h1 className="HomePageLogo" data-text="arcaderunner">arcaderunner</h1>
          <div className="HomePageButtonContainer">
            <Link to="/login" className="HomePageLink">
              <button type="button" onMouseEnter={() => onClick(true)} className='neonBtn'>LOGIN</button>
            </Link>
            <Link to="/signup" className="HomePageLink">
              <button type="button" onMouseEnter={() => onClick(false)}  className='neonBtn'>SIGN UP</button>
            </Link>
            {playSound ? <ReactHowler
        src={ `${process.env.PUBLIC_URL}${makeSoundPlay}`}
        playing={true}
      /> : ""}
          </div>
        </div>
      </section>
    );
  }
}

export default Home;