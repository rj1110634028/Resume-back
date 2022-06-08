const { authService, userService } = require("../services/index");
const signUp = async (req, res) => {
  try {
    const data = req.body;
    if (
      !(await userService.isName(data.name)) ||
      !(await userService.isEmail(data.email)) ||
      !(await userService.isPassword(data.password)) ||
      !(await authService.confirmPassword(data.password, data.confirm))
    ) {
      return res.status(400).json({
        err: "資料格式有誤",
        data,
      });
    }
    if (await userService.isEmailExists(data.email)) {
      return res.status(400).json({
        err: "此信箱已註冊過",
      });
    }
    const hashPassword = await authService.hashPassword(data.password);
    const user = await userService.createUser(
      data.name,
      data.email,
      hashPassword
    );
    const Day = 1000 * 60 * 60 * 24;
    const token = await authService.makeToken(user.id, Date.now() + 7 * Day);
    const reFreshToken = await authService.makeToken(
      user.id,
      Date.now() + 30 * Day
    );
    return res.status(200).json({
      message: "註冊成功",
      id: user.id,
      name: user.name,
      token,
      reFreshToken,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      err: "伺服器錯誤",
    });
  }
};

const logIn = async (req, res) => {
  try {
    const data = req.body;
    if (
      !(await userService.isEmail(data.email)) ||
      !(await userService.isPassword(data.password))
    ) {
      return res.status(400).json({
        err: "資料格式有誤",
      });
    }
    if (!(await authService.checkEmailAndPassword(data.email, data.password))) {
      return res.status(401).json({
        err: "信箱或密碼輸入不正確",
      });
    }
    const user = await userService.getUserData(data.email);
    const Day = 1000 * 60 * 60 * 24;
    const token = await authService.makeToken(user.id, Date.now() + 7 * Day);
    const reFreshToken = await authService.makeToken(
      user.id,
      Date.now() + 30 * Day
    );
    return res.status(200).json({
      message: "登入成功",
      id: user.id,
      name: user.name,
      token,
      reFreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: "伺服器錯誤",
    });
  }
};

const anonymousLogIn = async (req, res) => {
  try {
    let name = "";
    do {
      name = "guest-" + String(Math.random() * 1000000).split(".")[1];
    } while (!userService.isNameExists(name));
    user = await userService.createUser(name);
    const year = 1000 * 60 * 60 * 24 * 365;

    const guestToken = await authService.makeToken(
      user.id,
      Date.now() + 100 * year
    );
    return res.status(200).json({
      message: "登入成功",
      id: user.id,
      name: user.name,
      guestToken,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      err: "伺服器錯誤",
    });
  }
};

module.exports = {
  signUp,
  logIn,
  anonymousLogIn,
};
