const db = require("../models/index");

const isName = async (name) => {
  return name != null && name.length <= 40;
};
const isPassword = async (password) => {
  return password != null;
};
const isEmail = async (email) => {
  regex =
    /^[\w!#$%&'*+\-/=?^_`{|}~]+(.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(.[\w-]+)+$/;
  return email != null && await regex.test(email);
};

module.exports = {
  isName,
  isPassword,
  isEmail,
};
