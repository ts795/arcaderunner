const router = require("express").Router();
const { User } = require("../../models");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// get config vars
dotenv.config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

//POST -  /api/login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!userData) {
      res
        .status(500)
        .json({ message: "Invalid username or password. Please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Invalid username or password. Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      // Create a JWT token that the client can use to authenticate
      const token = generateAccessToken({ user_id: userData.id });
      res.status(200).json({jwt_token: token});
    });
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
});

// POST - api/signup
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      // Create a JWT token that the client can use to authenticate
      const token = generateAccessToken({ user_id: userData.id });
      res.status(200).json({jwt_token: token});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST - api/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
