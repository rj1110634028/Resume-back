const db = require("../models/index");

const isName = async (name) => {
  return name && name.length <= 40;
};
const isNameExists = async (name) => {
  const { count, rows } = await db.user.findAndCountAll({
    where: {
      name,
    },
  });
  return count;
};
const isPassword = async (password) => {
  return password;
};
const isEmail = async (email) => {
  regex =
    /^[\w!#$%&'*+\-/=?^_`{|}~]+(.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(.[\w-]+)+$/;
  return email && (await regex.test(email));
};
const isEmailExists = async (email) => {
  const { count, rows } = await db.user.findAndCountAll({
    where: {
      email,
    },
  });
  return count;
};
const createUser = async (name, email = null, password = null) => {
  const maxId = await db.user.max("id");
  user = await db.user.create({
    id: maxId,
    name,
    email,
    password,
  });
  return user;
};
const getUserData = async (email) => {
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  return user;
};

module.exports = {
  isName,
  isNameExists,
  isPassword,
  isEmail,
  isEmailExists,
  createUser,
  getUserData,
};
