import React, { useState } from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';
import { loginOrSignup } from '../../utils/API';
import { loggedIn } from "../../utils/auth";
import ReactHowler from 'react-howler';


function UsernamePasswordForm(props) {
  // Here we set two state variables for firstName and lastName using `useState`
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userisLoggedIn, setLoggedIn] = useState(false);
  const [makeNoisePlay, setMakeNoisePlay] = useState('/Sounds/LogIn.wav');
  const [playNoise, setPlayNoise] = useState(false);


  
  if (!userisLoggedIn && loggedIn()) {
    setLoggedIn(true);
  }

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value);
    } else {
      setEmail(value);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // Alert the user their first and last name, clear the inputs
    var returnVal = loginOrSignup(username, password, props.formType === "Log In", email);
    returnVal.then((id) => {
      setUsername('');
      setPassword('');
      setEmail('');
      if (id) {
        setLoggedIn(true);
      }
    })
  };

    function playNoiseFunc() {
      setMakeNoisePlay('/Sounds/LogIn.wav');
      setPlayNoise(true);
    };


  let emailInput = '';
  if (props.formType !== "Log In") {
    emailInput = <input
      value={email}
      name="email"
      onChange={handleInputChange}
      type="text"
      placeholder="Email"
    />
  }

  if (userisLoggedIn) {
    let pathToRedirect = "/games";
    return <Redirect to={pathToRedirect} />
  } else {
    return (
      <form className="form">
        <input
          value={username}
          name="username"
          onChange={handleInputChange}
          type="text"
          placeholder="User Name"
        />
        {emailInput}
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="button" className="neonBtn" onMouseEnter={() => playNoiseFunc(true)}  onClick={handleFormSubmit}>
          {props.formType}
        </button>
        {playNoise ? <ReactHowler
        src={ `${process.env.PUBLIC_URL}${makeNoisePlay}`}
        playing={true}
      /> : ""}
      </form>
    );
  }
}

export default UsernamePasswordForm;
