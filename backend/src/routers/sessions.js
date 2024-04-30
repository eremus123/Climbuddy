const express = require("express");
const router = express.Router();
const {
  getAllSessions,
  addNewSession,
  updateSession,
  deleteSession,
  getUserSessions,
  joinSession,
  getUserLatestSession,
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
router.get("/latest/:username", authUser, getUserLatestSession);
router.put("/new", addNewSession, authAdmin, errorCheck);
router.patch("/update/:id", authAdmin, updateSession, errorCheck);
router.patch("/join/:id", authUser, joinSession, errorCheck);
router.delete(
  "/delete/:id",
  authAdmin,
  deleteSession,
  validateIdInParam,
  errorCheck
);

module.exports = router;
