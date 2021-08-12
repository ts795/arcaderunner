const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = $("#username-login").val().trim();
  const password = $("#password-login").val().trim();

  if (username && password) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = $("#username-signup").val().trim();
  const password = $("#password-signup").val().trim();

  if (username && password) {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};

$(".login-form").on("submit", loginFormHandler);
$(".signup-form").on("submit", signupFormHandler);
