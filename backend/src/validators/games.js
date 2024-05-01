const { body, param } = require("express-validator");

const validateIdInParam = [param("id", "id is required").not().isEmpty()];

const validateUserInParam = [
  param("username", "username is required").not().isEmpty(),
];

const validateAddGym = [
  body("gymname", "name is required").not().isEmpty(),
  body("gymname", "name must have a min of 1 character").isLength({
    min: 1,
  }),
];

module.exports = {
  validateIdInParam,
  validateUserInParam,
  validateAddGym,
};
