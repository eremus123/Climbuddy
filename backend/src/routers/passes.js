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
  validateUserInParam,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get(
  "/:username",
  authUser,
  getUserPasses,
  validateUserInParam,
  errorCheck
);
router.put(
  "/buy/:username",
  authUser,
  buyPasses,
  validateUserInParam,
  errorCheck
);
router.patch("/use/:id", authUser, usePasses, validateIdInParam, errorCheck);
router.delete(
  "/clear/:id",
  authUser,
  clearPasses,
  validateIdInParam,
  errorCheck
);

module.exports = router;
