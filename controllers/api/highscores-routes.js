const router = require("express").Router();
const path = require("path");
const { Highscores } = require('../../models');

// Get the high scores for a game in descending order
// First request parameter is the ID of the game to get high scores for
// 2nd parameter is the maximum number of high scores to get
router.get('/:gameId/:maxNumScores', async (req, res) => {
  try {
    // Get all of the games
    const highScoresData = await Highscores.findAll({
      where: {
        game_id: parseInt(req.params.gameId)
      },
      order: [['score', 'DESC']],
      limit: parseInt(req.params.maxNumScores)
    });
    const highScores = highScoresData.map((highScore) =>
      highScore.get({ plain: true })
    );
    res.json(highScores);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add a high score for a game


module.exports = router;
