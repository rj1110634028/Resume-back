const user = require("./userController");
const comment = require("./commentController");
const auth = require("./authController");

module.exports = {
  userController: user,
  commentController: comment,
  authController: auth,
};
