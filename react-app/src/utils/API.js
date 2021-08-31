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

export { loginOrSignup, getFavoriteGames,addFavoriteGame,logout, getGame};