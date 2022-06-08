const jwt = require("jsonwebtoken");
const db = require("../models/index");

const checkToken = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({
      err: "請登入",
    });
  } else {
    const token = req.headers.token;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      try {
        if (err) {
          return res.status(401).json({
            err: "請重新登入",
          });
        }
        user = await db["user"].findOne({
          where: {
            id: decoded.id,
          },
        });
        if (!user) {
          return res.status(401).json({
            err: "請重新登入",
          });
        } else if (decoded.expiredTime < Date.now()) {
          return res.status(401).json({
            err: "登入過期",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      } catch (err) {
        console.log(err);
        return res.status(401).json({
          err,
        });
      }
    });
  }
};
module.exports = {
  checkToken,
};
