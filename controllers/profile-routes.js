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

router.delete('/:id', async (req, res) => {
  try {
    const favoriteGamesData = await FavoriteGames.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!favoriteGamesData) {
      res.status(404).json({ message: 'No game found with that id!' });
      return;
    }

    res.status(200).json(favoriteGamesData);
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;
