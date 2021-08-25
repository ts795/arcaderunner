import React, { useState } from 'react';
import './UsernamePasswordForm.css';

function UsernamePasswordForm(props) {
  // Here we set two state variables for firstName and lastName using `useState`
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    return name === 'username' ? setUsername(value) : setPassword(value);
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // Alert the user their first and last name, clear the inputs
    alert(`TO BE IMPLEMENTED LATER`);
    setUsername('');
    setPassword('');
  };

  return (
    <form className="form">
    <input
        value={username}
        name="username"
        onChange={handleInputChange}
        type="text"
        placeholder="User Name"
    />
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

export default UsernamePasswordForm;
