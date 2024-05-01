const express = require("express");
const router = express.Router();
const {
  getAllGyms,
  addNewGym,
  updateGym,
  deleteGym,
  getRecentVisits,
} = require("../controllers/gyms");
const { authAdmin, authUser } = require("../middleware/auth.js");

const {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("", authUser, getAllGyms);
router.get("/:username", authUser, getRecentVisits);
router.put("/addgym", authAdmin, addNewGym, errorCheck);
router.patch("/updategym/:gymId", authAdmin, updateGym, errorCheck);
router.delete(
  "/deletegym/:id",
  authAdmin,
  deleteGym,
  validateIdInParam,
  errorCheck
);

module.exports = router;
