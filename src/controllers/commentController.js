const { commentService } = require("../services/index");

const show = async (req, res) => {
  try {
    const comment = await commentService.getComment();
    return res.json({
      comment,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: "伺服器錯誤",
    });
  }
};
const store = async (req, res) => {
  try {
    data = req.body;
    await commentService.getComment();
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: "伺服器錯誤",
    });
  }
};
const update = async (req, res) => {
  try {
    data = req.body;
    if (commentService.isComment(data.comment)) {
      return res.json({
        err: "資料不能為空",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: "伺服器錯誤",
    });
  }
};
const del = async (req, res) => {
  try {
    data = req.body;
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: "伺服器錯誤",
    });
  }
};

module.exports = {
  show,
  store,
  update,
  del,
};
