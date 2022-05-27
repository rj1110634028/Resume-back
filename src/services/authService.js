const db = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const checkRePassword = async (password, rePassword) => {
  return password === rePassword;
};
const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};
const makeToken = async (email, password) => {
  return jwt.sign({ email, password }, process.env.SECRET_KEY);
};
const checkEmailAndPassword = async (email, password) => {
  user = await db["users"].findOne({ where: { email } });
  return user.length && bcrypt.compareSync(password, user.password);
};
const checkToken = async (token) => {
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  return await checkEmailAndPassword(decoded.email, decoded.password);
};

module.exports = {
  checkEmailAndPassword,
  checkToken,
  checkRePassword,
  hashPassword,
  makeToken,
};
