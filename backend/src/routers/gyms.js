const express = require("express");
const router = express.Router();
const {
  getAllGyms,
  addNewGym,
  updateGym,
  deleteGym,
} = require("../controllers/gyms");

const {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("", getAllGyms);
router.put("/addgym", addNewGym, errorCheck);
router.patch("/updategym/:gymId", updateGym, errorCheck);
router.delete("/deletegym/:id", deleteGym, validateIdInParam, errorCheck);

router.get("/favourites");
router.patch("/favourites/:id", validateIdInParam, errorCheck);
router.delete("/favourites/:id", validateIdInParam, errorCheck);

module.exports = router;
