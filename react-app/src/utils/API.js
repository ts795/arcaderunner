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

//Get HighScores of a user
async function getHighScores() {
    const response = await fetch('/api/highscores', {
        method: 'GET',
        //any route that needs authentication will need this next line
        headers: { 'authorization': 'bearer ' + localStorage.getItem('arcadeRunnerJWTToken') },
    });
    if (response.ok) {
        const json = await response.json();
        return json.highscores;
    } else {
        return;
    }
}

export { loginOrSignup, getFavoriteGames, getHighScores };