const db = require("../models/index");

const isComment = (comment) => {
    return comment != null;
}

const getComment = async () => {
  const comment = await db["comment"].findAll({
    attributes: ["userId", "comment", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
  return comment;
};

module.exports = {
  getComment,
  isComment
};
