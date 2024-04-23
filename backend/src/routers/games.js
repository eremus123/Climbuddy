const express = require("express");
const router = express.Router();
const {
  getAllGames,
  getGameByUserPlaylist,
  updateGame,
  removeGame,
  getFavourites,
} = require("../controllers/games");
const {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("/game_info/seed", seedGames);
router.get("/game_info", getAllGames);
router.put("/favourites", validateAddGame, errorCheck, addFavourites);
router.post(
  "/favourites",
  validateUserInBody,
  errorCheck,
  getGameByUserPlaylist
);
router.get("/favourites", getFavourites);
router.patch("/favourites/:id", validateIdInParam, errorCheck, updateGame);
router.delete("/favourites/:id", validateIdInParam, errorCheck, removeGame);

module.exports = router;
