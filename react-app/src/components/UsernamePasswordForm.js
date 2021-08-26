import React, { useState } from 'react';
import './UsernamePasswordForm.css';
import  loginOrSignup from '../utils/API';
import { Redirect } from 'react-router-dom'

function UsernamePasswordForm(props) {
  // Here we set two state variables for firstName and lastName using `useState`
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

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
        setUserId(id);
      }
    })
  };

  let emailInput = '';
  if (props.formType !== "Log In") {
      emailInput =     <input
        value={email}
        name="email"
        onChange={handleInputChange}
        type="text"
        placeholder="Email"
        />
  }

  if (userId) {
    let pathToRedirect = "/games/" + userId;
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
      <button type="button" className="neonBtn" onClick={handleFormSubmit}>
          {props.formType}
      </button>
      </form>
    );
  }
}

export default UsernamePasswordForm;
