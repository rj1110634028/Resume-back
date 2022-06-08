const db = require("../models/index");
const { Op } = require("sequelize");

const isComment = async (comment) => {
  return comment;
};

const getComment = async (search = null) => {
  const comment = await db.comment.findAll({
    attributes: ["id", "userId", "comment", "createdAt"],
    where: search ? {comment:{[Op.like]:`%${search}%`}} : {},
    include: [
      {
        model: db["user"],
        attributes: ["name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  return comment;
};

const createComment = async (comment, userId) => {
  const maxId = await db.comment.max("id");
  return await db.comment.create({
    comment,
    userId,
  });
};

const updateComment = async (comment, id) => {
  return await db.comment.update(
    {
      comment,
    },
    {
      where: {
        id,
      },
    }
  );
};

const deleteComment = async (id) => {
  return await db.comment.destroy({
    where: {
      id,
    },
  });
};

const hasComment = async (id) => {
  const comment = await db.comment.findOne({
    where: {
      id,
    },
  });
  return comment;
};

const isOnwer = async (id, userId) => {
  const comment = await db.comment.findOne({
    where: {
      id,
    },
    attributes: ["userId"],
  });
  return userId === comment.userId;
};

module.exports = {
  getComment,
  isComment,
  createComment,
  updateComment,
  deleteComment,
  hasComment,
  isOnwer,
};
