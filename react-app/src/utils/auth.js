import decode from 'jwt-decode';

function getToken() {
    return localStorage.getItem('arcadeRunnerJWTToken');
}

function loggedIn() {
    const token = getToken();
    // If there is a token and it's not expired, return `true`
    return token && !isTokenExpired(token) ? true : false;
}

function isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    console.log(decoded.exp, Date.now());
    if (decoded.exp < Date.now() / 1000) {
        removeJSONWebToken();
        return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
}

function removeJSONWebToken() {
    localStorage.removeItem('arcadeRunnerJWTToken');
}

export { loggedIn, removeJSONWebToken };