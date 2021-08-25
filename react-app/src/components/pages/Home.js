import React from "react";
import { Link } from "react-router-dom";

function Home() {
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

export default Home;