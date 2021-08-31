import './App.css';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Games from "./components/pages/Games";
import Profile from "./components/pages/Profile";
import BeforeGame from './components/pages/BeforeGames/BeforeGame';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="app-root">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/games/:userId" component={Games} />
        <Route exact path="/profile/:userId" component={Profile} />
        <Route exact path="/game/:id" component={BeforeGame} />
      </div>
    </Router>
  );
}

export default App;
