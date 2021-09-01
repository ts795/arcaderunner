import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { loggedIn } from "../../../utils/auth";
import './Home.css';


function Home() {
  const [userisLoggedIn, setLoggedIn] = useState(false);

  if (!userisLoggedIn && loggedIn()) {
    console.log("User already logged in");
    setLoggedIn(true);
  }

  if (userisLoggedIn) {
    console.log("Redirecting to /games");
    let pathToRedirect = "/games";
    return <Redirect to={pathToRedirect} />
  } else {

    return (
      <section>
        <div className="container">
          <h1 data-text="ARCADE RUNNER">ARCADE RUNNER</h1>
          <div className="buttonContainer">
            <Link to="/login" className="homeLink">
              <button className='neonBtn'>LOGIN</button>
            </Link>
            <Link to="/signup" className="homeLink">
              <button className='neonBtn'>SIGN UP</button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;