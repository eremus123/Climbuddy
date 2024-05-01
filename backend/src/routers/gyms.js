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
  validateUserInParam,
  validateAddGym,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("", authUser, getAllGyms);
router.get("/:username", authUser, getRecentVisits),
  validateUserInParam,
  errorCheck;
router.put("/addgym", authAdmin, addNewGym, validateAddGym, errorCheck);
router.patch("/updategym/:gymId", authAdmin, updateGym);
router.delete(
  "/deletegym/:id",
  authAdmin,
  deleteGym,
  validateIdInParam,
  errorCheck
);

module.exports = router;
