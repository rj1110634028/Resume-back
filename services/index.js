const user = require("./userService");
const comment = require("./commentService");
const auth = require("./authService");

module.exports = {
  userService: user,
  commentService: comment,
  authService: auth,
};