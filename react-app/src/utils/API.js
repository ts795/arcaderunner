import jwt_decode from "jwt-decode";

async function loginOrSignup(username, password, login, email) {
    if (username && password) {
        if (!login && !email) {
            return;
        }
        let bodyToSend = { username, password };
        if (!login) {
            bodyToSend.email = email;
        }
        const response = await fetch(login ? '/api/login' : '/api/signup', {
            method: 'POST',
            body: JSON.stringify(bodyToSend),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const json = await response.json();
            localStorage.setItem('arcadeRunnerJWTToken', json.jwt_token);
            return jwt_decode(json.jwt_token).user_id;
        } else {
            alert("Invalid email or password!");
            return;
        }
    }
}

// Get the favorite games for a user
async function getFavoriteGames() {
    const response = await fetch('/api/favorite', {
        method: 'GET',
        //any route that needs authentication will need line 33 header
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
        const json = await response.json();
        return json.favoriteG;
    } else {
        return;
    }
}
async function addFavoriteGame(gameId){
    const token = localStorage.getItem('arcadeRunnerJWTToken');
    console.log(gameId)
    const response = await fetch('/api/favorite', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json','authorization': 'bearer ' + token },
        body: JSON.stringify({game_id:gameId}),
    });
    if (response.ok) {
        //IDK
       alert("added to favorites")
    } else {
        return;
    }
};
async function logout(){
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
      });
      if (response.ok) {
        localStorage.removeItem('arcadeRunnerJWTToken');
        alert('you are now logged out')
        return;
      } else {
        alert('Failed to log out.');
      }
};
async function getGame(gameId){
    const response = await fetch('/api/game/' + gameId, {
        method: 'GET',
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        console.log("Unable to find game")
        return {};
    }
};
async function getFavoritedGame(favoriteGameId){
    const response = await fetch('/api/favorite/' + favoriteGameId, {
        method: 'GET',
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
        const json = await response.json();
        console.log("game added");
        return json;
    } else {
        console.log("Unable to find game to add")
        return {};
    }
};

async function deleteFavoritedGame(favoriteGameId){
    const response = await fetch('/api/favorite/' + favoriteGameId, {
        method: 'DELETE',
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
     console.log("deleted")
    } else {
        console.log("Unable to find game")
        return {};
    }
};


//Get HighScores of a user
async function getHighScores() {
    const response = await fetch('/api/highscores', {
        method: 'GET',
        //any route that needs authentication will need this next line
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
        const json = await response.json();
        console.log("JSON", json);
        return json;
    } else {
        return;
    }
}


async function getAllHighScores() {
    const response = await fetch('/api/highscores/10', {
        method: 'GET',
        //any route that needs authentication will need this next line
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
        const json = await response.json();
        console.log("JSON", json);
        return json;
    } else {
        return;
    }
}

async function addHighscore(game_id, gameScore){
    const token = localStorage.getItem('arcadeRunnerJWTToken');
    console.log(game_id)
    const response = await fetch('/api/highscores', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json','authorization': 'bearer ' + token },
        body: JSON.stringify({gameId:game_id, score:gameScore}),
    });
    if (!response.ok) {
        //IDK
       alert("unable to add score")
    }
};

export { loginOrSignup, getFavoriteGames, getHighScores,addFavoriteGame,logout, getGame, getFavoritedGame, deleteFavoritedGame, getAllHighScores, addHighscore };

