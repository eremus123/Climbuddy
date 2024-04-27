const express = require("express");
const router = express.Router();
const {
  getUserPasses,
  buyPasses,
  usePasses,
  sellPasses,
} = require("../controllers/passes");
const { authAdmin, authUser } = require("../middleware/auth.js");

const {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("/:username", authUser, getUserPasses);
router.put("/buy/:username", authUser, buyPasses, errorCheck);
router.patch("/use/:username", authUser, usePasses, errorCheck);
router.delete("/sell/:id", authUser, sellPasses, validateIdInParam, errorCheck);

module.exports = router;
