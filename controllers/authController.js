const { authService,userService } = require("../services/index");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    data = req.body;
    if (
      (await authService.checkNameFormat(data.name)) ||
      (await authService.checkPasswordFormat(data.password)) ||
      (await authService.checkEmailFormat(data.email))
    ) {
      return res.status(400).json({
        detail: "資料格式有誤",
      });
    }
    if (!(await authService.checkEmailExistsBySignUpEmail(data.email))) {
      return res.status(400).json("此信箱已註冊過");
    }
    let hashPassword=data.password
    await userService.createUser(
      data.name,
      data.email,
      hashPassword
    );
    return res.status(200).json({
      detail: "註冊成功",
    });
  } catch (err) {
    return res.json({
      detail: "伺服器錯誤",
    });
  }
};

const logIn = async (req, res) => {
  try {
    data = req.body;
    if (
      (await authService.checkPasswordFormat(data.password)) ||
      (await authService.checkEmailFormat(data.email))
    ) {
      return res.status(400).json({
        detail: "資料格式有誤",
      });
    }
    if (
      (await authService.checkEmailExistsBySignUpEmail(data.email)) ||
      (await authService.checkPasswordAndEmail(
        data.email,
        data.password
      ))
    ) {
      return res.status(401).json({
        detail: "信箱或密碼輸入不正確",
      });
    }
    signInMemberInfo = await authService.getMemberInfo(data.email);
    const token = jwt.sign(
      { user_id: signInMemberInfo.id, user_mail: signInMemberInfo.email },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      detail: "登入成功",
      token: token,
      name: signInMemberInfo.first_name + " " + signInMemberInfo.second_name,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      detail: "伺服器錯誤",
    });
  }
};
module.exports = {
  signUp,
  logIn,
};