const router = require("express").Router();
const path = require("path");
const { Highscores } = require("../models");

router.get('/', async (req, res) => {
  try {
    // Get all of the highscores recorded by the user
    const userHighscoresData = await Highscores.findAll({
      where: {
        user_id: req.session.user_id
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    const userHighscores = userHighscoresData.map((highscores) =>
      highscores.get({ plain: true })
    );

    res.json(userHighscores);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
