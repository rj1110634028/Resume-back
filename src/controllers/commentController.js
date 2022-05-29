const { commentService } = require("../services/index");

const show = async (req, res) => {
  try {
    const comment = await commentService.getComment();
    return res.status(200).json({
      comment,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      err: "伺服器錯誤",
    });
  }
};

const store = async (req, res) => {
  try {
    const comment = req.body.comment;
    if (!(await commentService.isComment(comment))) {
      return res.status(400).json({
        err: "資料格式錯誤",
      });
    }
    const decoded = req.decoded;
    const dbComment = await commentService.createComment(comment, decoded.id);
    if (dbComment) {
      return res.status(200).json({
        message: "新增成功",
        dbComment,
      });
    } else {
      return res.status(400).json({
        err: "新增失敗",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: "伺服器錯誤",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.decoded.id;
    if (!(await commentService.hasComment(id))) {
      return res.status(403).json({
        err: "留言已刪除",
      });
    }
    if (!(await commentService.isOnwer(id, userId))) {
      return res.status(403).json({
        err: "權限不足",
      });
    }
    const comment = req.body.comment;
    if (!(await commentService.isComment(comment))) {
      return res.status(400).json({
        err: "資料格式錯誤",
      });
    }
    if (!(await commentService.updateComment(comment, id))) {
      return res.status(400).json({
        err: "資料格式錯誤",
      });
    } else {
      return res.status(200).json({
        message: "修改成功",
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
    const id = req.params.id;
    const userId = req.decoded.id;
    if (!(await commentService.hasComment(id))) {
      return res.status(403).json({
        err: "留言已刪除",
      });
    }
    if (!(await commentService.isOnwer(id, userId))) {
      return res.status(403).json({
        err: "權限不足",
      });
    }
    if (!(await commentService.deleteComment(id))) {
        return res.status(400).json({
          err: "錯誤",
        });
      } else {
        return res.status(200).json({
          message: "刪除成功",
        });
      }
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
