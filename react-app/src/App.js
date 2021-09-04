import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Games from "./components/pages/Games";
import GameStart from "./components/pages/GameStart"
import Profile from "./components/pages/Profile";
import BeforeGame from './components/pages/BeforeGames';
import HighScores from "./components/pages/HighScores/HighScores";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div id="app-root">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
       
          <Route exact path="/game/:id" component={BeforeGame} />
          <Route exact path="/highscores" component={HighScores} />
          <Route exact path="/gamestart/:gameId" component={GameStart} />
          <Route exact path="/games" component={Games} />
          <Route exact path="/userprofile" component={Profile} />
     
      </div>
    </Router>
  );
}

export default App;
