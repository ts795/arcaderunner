const router = require("express").Router();
const userRoutes = require("./user-routes");
const gameRoutes = require("./game-routes");
const highscoresRoutes = require("./highscores-routes");
const messageRoutes = require("./message-routes");

router.use("/", userRoutes);
router.use("/highscores", highscoresRoutes);
router.use("/message", messageRoutes);
router.use("/game", gameRoutes);

module.exports = router;
