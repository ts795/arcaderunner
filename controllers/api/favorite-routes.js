const router = require("express").Router();
const { Favorites } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Get all of the favorite games

    // const favoriteData = await Favorites.findAll({
    // });
    // const favorite = favoriteData.map((game) =>
    //   game.get({ plain: true })
    // );

    //documentation on favorite routes: https://stackoverflow.com/questions/53280738/join-in-sequelize/53288485

    const favoriteData = await Favorites.findAll({
    include: { 
        model: sequelize.models.users,
        as: 'favorite',
        where: {
            id: user_id
        },
        required: false
    }
});

    res.json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one game by id
router.get('/:id', async (req, res) => {
  try {
    // Get all of the games
    const gamesData = await Games.findOne({
      where: {
        id: req.params.id
      }

    });
    const game = gamesData.get({ plain: true });

    res.json(game);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a game with the passed in ID
router.delete('/:id', async (req, res) => {
  try {
    let gameData = await Games.findByPk(req.params.id);
    if (!gameData) {
      res.status(400).json({ message: 'No game found with that id!' });
      return;
    } else {
      dbTripData = await Games.destroy(
        {
          where: {
            id: req.params.id,
          },
        });
      res.status(200).json({ message: 'Deleted the game successfully!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


});

// add a game
// router.post('/', async (req, res) => {
//   try {
//     const gameData = await Games.create({
//       name: req.body.name,
//       description: req.body.description
//     })
//     res.status(200).json(gameData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Update a game
// router.put('/:id', async (req, res) => {
//   try {
//     var data = {};
//     // Allow for fields to be individually updated
//     if (req.body.name) {
//       data.name = req.body.name;
//     }
//     if (req.body.description) {
//       data.description = req.body.description;
//     }
//     const gameData = await Games.update(data,
//       {
//         where: {
//           id: req.params.id,
//         },
//       });
//     res.status(200).json(gameData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
