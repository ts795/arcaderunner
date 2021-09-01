import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Games from "./components/pages/Games";
import Profile from "./components/pages/Profile";
import HighScores from "./components/pages/High Scores/HighScores";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="app-root">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <div id="NavBar">
        <Route exact path="/highscores" component={HighScores} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/profile" component={Profile} />
        </div>
      </div>
    </Router>
  );
}

export default App;
