const { body } = require("express-validator");

const validateRegistrationData = [
  body("username", "Invalid Username").not().isEmpty(),
  body("password", "Invalid Password").not().isEmpty(),
  body("password", "Password needs to be between 6 and 20 characters.").isLength({
    min: 6,
    max: 20,
  }),
];

const validateLoginData = [
  body("username", "Invalid Username").not().isEmpty(),
  body("password", "Invalid Password").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
