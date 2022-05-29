const db = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const checkRePassword = async (password, rePassword) => {
  return password === rePassword;
};
const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};
const makeToken = async (id, email, password, expiredTime) => {
  return jwt.sign({ id, email, password, expiredTime }, process.env.SECRET_KEY);
};
const checkEmailAndPassword = async (email, password) => {
  user = await db["user"].findOne({ where: { email } });
  return user != null && bcrypt.compareSync(password, user.password);
};
const checkToken = async (token) => {
  let decoded = jwt.verify(
    token,
    process.env.SECRET_KEY,
    function (err, decoded) {
      return !err ? err : decoded;
    }
  );
  return decoded || null;
};

module.exports = {
  checkEmailAndPassword,
  checkToken,
  checkRePassword,
  hashPassword,
  makeToken,
};
