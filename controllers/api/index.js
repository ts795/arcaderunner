const router = require("express").Router();
const userRoutes = require("./user-routes");
const gameRoutes = require("./game-routes");
const highscoresRoutes = require("./highscores-routes");
const messageRoutes = require("./message-routes");
const favoriteRoutes = require("./favorite-routes");

router.use("/", userRoutes);
router.use("/highscores", highscoresRoutes);
router.use("/message", messageRoutes);
router.use("/game", gameRoutes);
router.use("/favorite", favoriteRoutes);

module.exports = router;
