const router = require("express").Router();
const { FavoriteGames } = require('../../models');

router.get('/', async (req, res) => {
  try {
   

    //documentation on favorite routes: https://stackoverflow.com/questions/53280738/join-in-sequelize/53288485

    const favoriteData = await FavoriteGames.findAll({
        where: {
            user_id: req.session.user_id, 
            //=======how to check user id with JWT======
        },
    // include: { 
    //     model: sequelize.models.games,
    //     as: 'favorite',
    //     required: false
    // }
});
console.log("this is it==========================", favoriteData);
    const favorite = favoriteData.map((favoriteGame) =>
      favoriteGame.get({ plain: true })
    );
    res.json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one game by id
router.get('/:id', async (req, res) => {
  try {
    // Get all of the games
    const gamesData = await FavoriteGames.findOne({
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
//user favorite a game
router.post('/',async (req,res) =>{
  try{ 
    const favoriteGamesData = await FavoriteGames.create({
      user_id: req.session.user_id,//update to jwt token
      game_id:req.body.game_id
  });

  res.status(200).json(favoriteGamesData);
  } catch (err) {
    console.log(err);
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

// // Delete a game with the passed in ID
// router.delete('/:id', async (req, res) => {
//   try {
//     let gameData = await Games.findByPk(req.params.id);
//     if (!gameData) {
//       res.status(400).json({ message: 'No game found with that id!' });
//       return;
//     } else {
//       dbTripData = await Games.destroy(
//         {
//           where: {
//             id: req.params.id,
//           },
//         });
//       res.status(200).json({ message: 'Deleted the game successfully!' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }


// });

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
