const express = require("express");
const router = express.Router();
const {
  getAllSessions,
  addNewSession,
  updateSession,
  deleteSession,
  getUserSessions,
} = require("../controllers/sessions");
const { authAdmin, authUser } = require("../middleware/auth.js");

const {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
} = require("../validators/games");
const { errorCheck } = require("../validators/errorCheck");

router.get("", authUser, getAllSessions);
router.get("/:username", authUser, getUserSessions);
router.put("/new", addNewSession, authAdmin, errorCheck);
router.patch("/update/:id", authAdmin, updateSession, errorCheck);
router.delete(
  "/delete/:id",
  authAdmin,
  deleteSession,
  validateIdInParam,
  errorCheck
);

module.exports = router;
