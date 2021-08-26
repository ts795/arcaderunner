export default async function loginOrSignup(username, password, login, email) {
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
            window.arcadeRunnerJWTToken = json.jwt_token;
            return json.user_id;
        } else {
            return;
        }
      }
}
