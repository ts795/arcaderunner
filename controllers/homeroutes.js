const router = require("express").Router();
const path = require("path");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;

//login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  console.log("req.session.loggedIn", req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render(__dirname, "../views/login.html");
});