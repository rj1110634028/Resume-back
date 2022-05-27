const { authService, userService } = require("../services/index");
const signUp = async (req, res) => {
  try {
    data = req.body;
    console.log(data);
    if (
      (await !userService.isName(data.name)) ||
      (await !userService.isEmail(data.email)) ||
      (await !userService.isPassword(data.password)) ||
      (await !authService.checkRePassword(data.password, data.rePassword))
    ) {
      return res.status(400).json({
        message: "資料格式有誤",
      });
    }
    if (!(await authService.checkEmailExistsBySignUpEmail(data.email))) {
      return res.status(400).json({
        message: "此信箱已註冊過",
      });
    }
    let hashPassword = data.password;
    await userService.createUser(data.name, data.email, hashPassword);
    return res.status(200).json({
      message: "註冊成功",
    });
  } catch (err) {
    console.log(err.message)
    return res.json({
      message: "伺服器錯誤",
    });
  }
};

const logIn = async (req, res) => {
  try {
    data = req.body;
    if (
      (await authService.isEmail(data.email)) ||
      (await authService.isPassword(data.password))
    ) {
      return res.status(400).json({
        message: "資料格式有誤",
      });
    }
    if (await authService.checkPasswordAndEmail(data.email, data.password)) {
      return res.status(401).json({
        message: "信箱或密碼輸入不正確",
      });
    }
    signInMemberInfo = await userService.getMemberInfo(data.email);
    const token = jwt.sign(
      { user_id: signInMemberInfo.id, user_mail: signInMemberInfo.email },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      message: "登入成功",
      token: token,
      name: signInMemberInfo.first_name + " " + signInMemberInfo.second_name,
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
