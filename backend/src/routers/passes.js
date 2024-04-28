const express = require("express");
const router = express.Router();
const {
  getUserPasses,
  buyPasses,
  usePasses,
  clearPasses,
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
router.patch("/use/:id", authUser, usePasses, errorCheck);
router.delete(
  "/clear/:id",
  authUser,
  clearPasses,
  validateIdInParam,
  errorCheck
);

module.exports = router;
