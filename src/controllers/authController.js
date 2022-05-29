const { authService, userService } = require("../services/index");
const signUp = async (req, res) => {
  try {
    data = req.body;
    if (
      !(await userService.isName(data.name)) ||
      !(await userService.isEmail(data.email)) ||
      !(await userService.isPassword(data.password)) ||
      !(await authService.checkRePassword(data.password, data.rePassword))
    ) {
      return res.status(400).json({
        message: "資料格式有誤",
      });
    }
    if (await userService.isEmailExists(data.email)) {
      return res.status(400).json({
        message: "此信箱已註冊過",
      });
    }
    let hashPassword = await authService.hashPassword(data.password);
    await userService.createUser(data.name, data.email, hashPassword);
    return res.status(200).json({
      message: "註冊成功",
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "伺服器錯誤",
    });
  }
};

const logIn = async (req, res) => {
  try {
    data = req.body;
    if (
      !(await userService.isEmail(data.email)) ||
      !(await userService.isPassword(data.password))
    ) {
      return res.status(400).json({
        message: "資料格式有誤",
      });
    }
    if (!(await authService.checkEmailAndPassword(data.email, data.password))) {
      return res.status(401).json({
        message: "信箱或密碼輸入不正確",
      });
    }
    user = await userService.getUserData(data.email);
    Day = 1000 * 60 * 60 * 24;
    expiredTime = Date.now() + 7 * Day;
    const token = await authService.makeToken(
      data.email,
      data.password,
      Date.now() + 7 * Day
    );
    const reFreshToken = await authService.makeToken(
      data.email,
      data.password,
      Date.now() + 30 * Day
    );
    return res.status(200).json({
      message: "登入成功",
      name: user.name,
      token,
      reFreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "伺服器錯誤",
    });
  }
};
module.exports = {
  signUp,
  logIn,
};
