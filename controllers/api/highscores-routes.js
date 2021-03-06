const router = require("express").Router();
const path = require("path");
const { Highscores, Games, User } = require('../../models');
const authenticateJWT = require('../../utils/auth');

// Get the high scores for a game in descending order
// First request parameter is the ID of the game to get high scores for
// 2nd parameter is the maximum number of high scores to get
router.get('/:gameId/:maxNumScores', authenticateJWT, async (req, res) => {
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

router.get('/:maxNumScores', authenticateJWT, async (req, res) => {
  try {
    // Get all of the games
    const highScoresData = await Highscores.findAll({
      // group: 'game_id',
      order: [['score', 'DESC']],
      limit: parseInt(req.params.maxNumScores),
      include: [Games, User]

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
// The following are expected in the request body:
// gameID is the ID for the game
// score is the score for the user for the game
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const highScoreData = await Highscores.create({
      score: req.body.score,
      game_id: req.body.gameId,
      user_id: req.user.user_id
    })
    res.status(200).json(highScoreData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

//user's high scores

router.get('/', authenticateJWT, async (req, res) => {
  try {
    // Get all of the games
    const highScoresData = await Highscores.findAll({
      where: {
        user_id: req.user.user_id,
      },
      order: [['score', 'DESC']],
      include: Games,
      limit: 10
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


module.exports = router;
