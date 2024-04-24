const express = require("express");
const router = express.Router();
const { getAllGyms } = require("../controllers/gyms");
const {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("", getAllGyms);
router.post("/favourites", validateUserInBody, errorCheck);
router.get("/favourites");
router.patch("/favourites/:id", validateIdInParam, errorCheck);
router.delete("/favourites/:id", validateIdInParam, errorCheck);

module.exports = router;
