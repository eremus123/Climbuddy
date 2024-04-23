const { body, param } = require("express-validator");

const validateIdInParam = [param("id", "id is required").not().isEmpty()];

const validateUserInBody = [
  body("username", "username is required").not().isEmpty(),
];

const validateAddGame = [
  body("username", "username is required").not().isEmpty(),
  body("id", "id is required").not().isEmpty(),
  body("id", "must have a min of 1 and a max of 10 numbers").isLength({
    min: 1,
    max: 10,
  }),
  body("name", "name is required").not().isEmpty(),
  body("name", "name must have a min of 1 character").isLength({
    min: 1,
  }),
];

module.exports = {
  validateIdInParam,
  validateUserInBody,
  validateAddGame,
};
